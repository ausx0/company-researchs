/* eslint-disable react-hooks/exhaustive-deps */
import SelectField from "@/app/(root)/(Admin)/components/FormFields/SelectField";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrderTestsSchema } from "../../validation/orderSchema";
import { z } from "zod";
import {
  DollarSign,
  Plus,
  TestTubes,
  Trash2,
  UploadCloud,
  Wand,
} from "lucide-react";
import PatientModalForm from "@/app/(root)/(Admin)/customers/patients/components/PatientModalForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";

import { Separator } from "@/components/ui/separator";
import { apiGetSamples } from "@/app/services/api/Samples";
import {
  apiAddOrderSample,
  apiGetSubTestsByTest,
  apiGetTestsBySample,
} from "@/app/services/api/Orders/OrderForm";
import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { apiGetOrder } from "@/app/services/api/Orders/AllOrders";
import { usePathname } from "next/navigation";
import Loading from "@/components/ui/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import PaymentForm from "./PaymentForm";
import ModalAlert from "@/app/(root)/(Admin)/components/modals/ModalAlert";
import OrderSamples from "../../../view/[orderId]/components/OrderSamples";
import AllPaymentsOrder from "./AllPaymentsOrder";
import { set } from "date-fns";
interface OptionType {
  value: string;
  label: string;
}
// interface StepTwoFormProps {
//   control: Control<z.infer<typeof StepOneOrderSchema>>;
//   errors: FieldErrors<z.infer<typeof StepOneOrderSchema>>;
//   watch: any;
//   getValues: any;
//   reset: any;
//   setValue: any;
// }

type OrdersData = {
  ID: string;
  Test: { id: string; label: string };
  SubTest: { id: string; label: string }[];
  Price: number;
};

const StepTwoForm = (
  {
    // control,
    // errors,
    // watch,
    // getValues,
    // reset,
    // setValue,
  }
) => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  // // .log("this is the id", id);

  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [modalKey, setModalKey] = useState(0); // Add this state
  const [orders, setOrders] = useState<any[]>([]); // Add this state
  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [pendingSampleId, setPendingSampleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [orderIdCounter, setOrderIdCounter] = useState(1); // Initialize ID counter
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addedSubTests, setAddedSubTests] = useState<number[]>([]);
  const [isAllInvoicesOpen, setAllInvoicesOpen] = useState(false);

  const {
    data: patientsData,
    isLoading: patientsLoading,
    isFetching: patientsFetching,
    error: patientsError,
  } = useQuery({
    queryKey: ["Lab-Patients"],
    queryFn: apiGetPatients,
  });

  const {
    data: orderData,
    isLoading: orderLoading,
    isFetching: orderFetching,
    error: orderError,
  } = useQuery({
    queryKey: ["Lab-Orders"],
    queryFn: () => (id ? apiGetOrder(id) : Promise.resolve(null)),
  });

  const {
    data: SamplesData,
    isLoading: SamplesLoading,
    isFetching: SamplesFetching,
    error: SamplesError,
  } = useQuery({
    queryKey: ["Lab-Samples"],
    queryFn: apiGetSamples,
  });

  const {
    control,
    watch,
    getValues,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof OrderTestsSchema>>({
    resolver: zodResolver(OrderTestsSchema),
    defaultValues: {
      Order_id: id ? Number(id) : undefined,
      Sample_id: undefined,
      Tests: {
        Test_id: undefined,
        SubTest_id: [],
      },
      Patient_id: undefined,
      Total: totalPrice,
      Received: 0,
    },
  });

  const Test = watch("Tests.Test_id");
  const SubTest = watch("Tests.SubTest_id");
  const patientId = watch("Patient_id");

  // .log(watch("Tests.SubTest_id"));

  const sampleId = watch("Sample_id"); // Watch the "sample_id" field

  const TestsMutation = useMutation({
    mutationKey: ["Lab-Tests"],
    mutationFn: apiGetTestsBySample,
  });

  const SubTestsMutation = useMutation({
    mutationKey: ["Lab-SubTests"],
    mutationFn: apiGetSubTestsByTest,
  });

  const PatientOptions = () => {
    if (!patientsData) return [];
    return patientsData.map((item: any) => ({
      value: item.ID,
      label: item.Name,
    }));
  };

  const SamplesOptions = () => {
    if (!SamplesData) return [];
    return SamplesData.map((item: any) => ({
      value: item.ID,
      label: item.Sample,
    }));
  };

  const queryClient = useQueryClient();

  const AddTestOrder = useMutation({
    mutationKey: ["AddTestOrder"],
    mutationFn: apiAddOrderSample,
    onSuccess: () => {
      toast.success("Test added successfully");

      // queryClient.invalidateQueries({
      //   queryKey: ["LabOrders"],
      // }); // Invalidate the 'Orders' query
    },
    onError: (error: any) => {
      // Extract the error message from the error object
      const errorMessage = "Subtest already exsists";

      toast.error(errorMessage);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Lab-Orders"],
      });
    },
  });
  // // .log("error", errors);

  const handleNoSample = () => {
    setValue("Received", 0);
    setFormComplete(true);
    setOpenAlertModal(false); // Close the modal after setting state
    handleSubmit(onSubmit)(); // Submit the form
  };

  const handleYesSample = () => {
    setValue("Received", 1);
    setFormComplete(true);
    setOpenAlertModal(false); // Close the modal after setting state
    handleSubmit(onSubmit)(); // Submit the form
  };

  const onSubmit = (data: z.infer<typeof OrderTestsSchema>) => {
    // setFormComplete(false);
    // Check if Test and SubTest are not empty
    if (orders.length === 0) {
      if (orderData?.Type === 2 && patientId === undefined) {
        toast.error("Please select a Patient");
        return;
      }
      // Handle the case when Test or SubTest is empty
      // For example, show a toast message or alert
      // return early to prevent adding an empty order
      toast.error("Please select a Test and SubTest");
      return;
    }

    if (openAlertModal) {
      const dataWithOrders = {
        ...data,
        Tests: orders.map((order) => ({
          Test_id: order.Test.id,
          SubTest_id: order.SubTest.map((subTest: { id: any }) => subTest.id),
        })),
      };

      AddTestOrder.mutate(dataWithOrders);
      setFormComplete(false);
      reset();
      setOpenAlertModal(false);
      setOrders([]);
    } else setOpenAlertModal(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKey((prevKey) => prevKey + 1); // Increment the key every time the modal is closed
  };

  const handleSampleChange = (newSampleId: any) => {
    if (sampleId != undefined) setPendingSampleId(newSampleId);
    setOpen(true);
  };

  // // .log("sample id", sampleId);

  const selectAllSubTests = () => {
    const allSubTestsIds = SubTestsOptions().map(
      (option: OptionType) => option.value
    );
    setValue("Tests.SubTest_id", allSubTestsIds);
    console.log("All SubTests", allSubTestsIds);
  };

  useEffect(() => {
    if (sampleId) {
      TestsMutation.mutate(String(sampleId)); // Trigger the mutation when "sample_id" changes
      setValue("Tests.Test_id", Number(undefined)); // Reset the "test_id" field
      setValue("Tests.SubTest_id", []); // Reset the "SubTest_id" field

      // Extract all SubTest IDs from all orders before clearing them
      const allDeletedSubTestIds = orders.flatMap((order) =>
        order.SubTest.map((subTest: any) => subTest.id)
      );

      // Update addedSubTests to remove all SubTest IDs from the cleared orders
      setAddedSubTests((prevAdded) =>
        prevAdded.filter(
          (subTestId) => !allDeletedSubTestIds.includes(subTestId)
        )
      );

      setOrders([]); // Reset the orders array
    }
    setValue("Tests.SubTest_id", []); // Reset the "SubTest_id" field
    setTotalPrice(0); // Reset the total price
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sampleId]);

  const TestData = TestsMutation.data;

  const TestsOptions = () => {
    if (!TestData) return [];
    return TestData.map((item: any) => ({
      value: item.ID,
      label: item.Test,
      Price: item.Price, // Assuming the data has a Price property
    }));
  };

  const testId = watch("Tests.Test_id"); // Watch the "testId" field
  // // .log("testId:", testId); // Log the testId value

  useEffect(() => {
    // // .log("mutating with testId:", testId); // Log the testId value before mutation

    if (testId) {
      // // .log("mutating with testId:", testId); // Log the testId value before mutation
      SubTestsMutation.mutate(String(testId)); // Trigger the mutation when "testId" changes
      setValue("Tests.SubTest_id", []); // Reset the "SubTest_id" field
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const SubTestData = SubTestsMutation.data;

  const SubTestsOptions = () => {
    if (!SubTestData) return [];
    return SubTestData!.map((item: any) => ({
      value: item.ID,
      label: item.SubTest,
      Price: item.Price, // Assuming the data has a Price property
    }));
  };

  const handleDelete = (orderId: string) => {
    // Find the order to be deleted
    const orderToDelete = orders.find((order) => order.ID === orderId);
    if (!orderToDelete) return;

    // Calculate the new total price by subtracting the price of the deleted order
    const updatedTotalPrice = totalPrice - orderToDelete.Price;
    setTotalPrice(updatedTotalPrice);

    // Remove the order from the orders array
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.ID !== orderId)
    );

    // Extract SubTest IDs from the deleted order
    const deletedSubTestIds = orderToDelete.SubTest.map(
      (subTest: any) => subTest.id
    );

    // Update addedSubTests to remove the SubTest IDs of the deleted order
    setAddedSubTests((prevAdded) =>
      prevAdded.filter((subTestId) => !deletedSubTestIds.includes(subTestId))
    );

    // Optionally, if you need to reset or update the select component to reflect these changes,
    // you might need to trigger some form of state update or call a function provided by the select component's API.
  };

  useEffect(() => {
    // Recalculate total price after removing the order
    // .log("total price", totalPrice);
    setValue("Total", totalPrice);
  }, [orders]);

  const columns: ColumnDef<OrdersData>[] = [
    {
      accessorKey: "ID",
      header: "ID",
    },
    {
      accessorKey: "Test",
      header: "Test ID",
      cell: ({ row }) => row.original.Test.label,
    },
    {
      accessorKey: "SubTest",
      header: "SubTest IDs",
      cell: ({ row }) =>
        row.original.SubTest
          ? row.original.SubTest.map((subTest) => subTest.label).join(", ")
          : "",
    },
    {
      accessorKey: "Price",
      header: "Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          color="danger"
          size="sm"
          onClick={() => handleDelete(row.original.ID)} // Define a function to handle delete action
        >
          <Trash2 /> {/* Render the Trash icon */}
        </Button>
      ),
    },
  ];

  const handleAddSample = () => {
    console.log("Test:", Test, "SubTest:", SubTest);

    if (!Test || !SubTest || SubTest.length === 0) {
      if (orderData?.Type === 2 && patientId === undefined) {
        toast.error("Please select a Patient");
        return;
      }
      toast.error("Please select a Test and SubTest");
      return;
    }

    const TestOption = TestsOptions().find(
      (option: { value: number }) => option.value === Test
    );
    const TestLabel = TestOption?.label;

    // Assuming SubTestsOptions() returns an array of { value, label, Price } for each subtest
    // and SubTest is an array of selected subtest IDs
    const SubTestOptions = SubTestsOptions().filter(
      (option: { value: number }) => SubTest.includes(option.value)
    );

    const SubTestLabels = SubTestOptions.map(
      (option: { label: any }) => option.label
    );
    const SubTestPrices = SubTestOptions.map(
      (option: { Price: any }) => option.Price
    );
    const totalSubTestPrice = SubTestPrices.reduce(
      (a: any, b: any) => a + b,
      0
    );

    const newTotal = totalPrice + totalSubTestPrice;
    setTotalPrice(newTotal);

    // .log("new total", newTotal);

    const newOrder = {
      ID: orderIdCounter,
      Test: { id: Test, label: TestLabel },
      SubTest: SubTestOptions.map((option: { value: any; label: any }) => ({
        id: option.value,
        label: option.label,
      })),
      Price: totalSubTestPrice,
    };

    // .log("newOrder", newOrder);
    setOrderIdCounter((prevCounter) => prevCounter + 1);

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    // Update the addedSubTests state with the newly added SubTest IDs
    setAddedSubTests((prevAdded) => [...prevAdded, ...SubTest]);
    setValue("Tests.SubTest_id", []); // Reset the "SubTest_id" field
  };

  // Function to get available SubTests excluding the added ones
  const getAvailableSubTests = () => {
    return SubTestsOptions().filter(
      (option: { value: number }) => !addedSubTests.includes(option.value)
    );
  };

  // Example usage of getAvailableSubTests in rendering
  // This part of the code would be used in your component's return statement
  // to render the select field with options
  const availableSubTests = getAvailableSubTests();

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setValue("Sample_id", pendingSampleId);
          setPendingSampleId("");
          setOpen(false);
        }}
        loading={loading}
        title="This Action Will Reset The Tests Table"
      /> */}
      <ModalAlert
        backdrop="blur"
        size="md"
        title="Sample Received"
        description="Did You Receive The Sample?"
        isOpen={openAlertModal}
        handleNoAction={handleNoSample}
        handleYesAction={handleYesSample}
        onClose={() => setOpenAlertModal(false)}
        // onConfirm={handleYesSample}
      />
      <Modal
        backdrop="blur"
        isOpen={isAllInvoicesOpen}
        onClose={() => setAllInvoicesOpen(false)}
        size="5xl"
        className="overflow-hidden min-h-[90vh]"
      >
        <ModalContent className="overflow-hidden">
          <ModalHeader>Invoices Information</ModalHeader>
          <ModalBody className="overflow-auto">
            <AllPaymentsOrder />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        className="overflow-hidden max-h-[90vh]"
      >
        <ModalContent className="overflow-hidden">
          <ModalHeader>Samples Information</ModalHeader>
          <ModalBody className="overflow-auto">
            <OrderSamples />
          </ModalBody>
        </ModalContent>
      </Modal>
      <PatientModalForm
        key={modalKey} // Add the key prop here
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <div className="flex flex-col gap-8">
        <Card className="h-auto">
          <CardHeader className="font-bold text-3xl">
            Order Information{" "}
          </CardHeader>

          {!orderLoading && orderData ? (
            <CardContent className="p-6">
              <div className="flex justify-around">
                <div>
                  <h1 className="font-bold text-2xl uppercase">Order ID</h1>
                  <p className="leading-8 text-lg">
                    {orderData.Order_identifier}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-2xl uppercase">Name</h1>
                  <p className="leading-8 text-lg">{orderData.Client_name}</p>
                </div>
                <div>
                  <h1 className="font-bold text-2xl uppercase">Date</h1>
                  <p className="leading-8 text-lg">{orderData.Date}</p>
                </div>
                <div>
                  <h1 className="font-bold text-2xl uppercase">Type</h1>
                  <p className="leading-8 text-lg capitalize">
                    {orderData.Type === 1 ? "Patient" : "Client"}
                  </p>
                </div>
              </div>
            </CardContent>
          ) : (
            <Loading />
          )}
        </Card>
        <div className="w-full">
          <div className="flex flex-row-reverse gap-10">
            <div className="flex flex-col gap-10 w-[40%] h-full">
              <Card className="shadow-lg ">
                <CardHeader className="flex p-4 flex-row justify-between items-center">
                  <div>Payment Information</div>
                  <div>
                    <Button
                      onClick={() => setAllInvoicesOpen(true)}
                      color="primary"
                    >
                      <DollarSign className="w-6  " /> All Invoices
                    </Button>
                  </div>
                </CardHeader>{" "}
                <Separator />
                <CardContent>
                  <PaymentForm orderData={orderData} />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-10 w-3/4">
              <form
                className="flex flex-col gap-10"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Card className="shadow-lg h-auto w-full">
                  <CardHeader className="flex p-4 flex-row justify-between">
                    <div>Sample Information</div>
                    <div>
                      <Button onPress={onOpen} color="primary">
                        <TestTubes className="w-6  " /> All Samples
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="m-4 flex gap-8 flex-col">
                    <div className="flex gap-4 w-auto">
                      {orderData?.Type === 2 && (
                        <div className="flex flex-col w-full  ">
                          <div className="flex items-center">
                            <span>Patient</span>
                            <div
                              className="ml-2 bg-slate-400 w-6 rounded cursor-pointer"
                              onClick={() => setIsModalOpen(true)}
                            >
                              <Plus color="white" />
                            </div>
                          </div>
                          <SelectField
                            control={control}
                            name="Patient_id"
                            label=""
                            errors={errors}
                            options={PatientOptions()}
                            isLoading={patientsLoading}
                          />
                        </div>
                      )}

                      <div className="flex  w-full gap-2  ">
                        <div className="w-full">
                          <SelectField
                            key={sampleId} // Add key prop here
                            errors={errors}
                            isLoading={SamplesLoading}
                            label="Samples"
                            control={control}
                            name="Sample_id"
                            options={SamplesOptions()}
                            // onChange={handleSampleChange}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col w-full ">
                        <SelectField
                          key={`${sampleId}-test_id-${Date.now()}`} // Add timestamp to key prop
                          errors={errors}
                          isLoading={TestsMutation.isPending}
                          label="Tests"
                          control={control}
                          name="Tests.Test_id"
                          options={TestsOptions()}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 w-full  ">
                      <div className="w-full">
                        <SelectField
                          isMulti
                          key={`${sampleId}-SubTest_id-${Date.now()}`} // Add timestamp to key prop
                          errors={errors}
                          isLoading={SubTestsMutation.isPending}
                          label="Sub Test"
                          control={control}
                          name="Tests.SubTest_id"
                          options={availableSubTests} // Pass the options directly
                        />
                      </div>
                      <div className="flex items-end w-auto ">
                        <Button
                          type="button"
                          className="bg-slate-500"
                          onClick={selectAllSubTests}
                        >
                          <Wand color="white" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-center items-center">
                      <Button
                        type="button"
                        onClick={handleAddSample}
                        className="bg-slate-500 text-white   "
                      >
                        <Plus />
                      </Button>
                      {/* {errors.Samples && (
                      <p className="text-danger">{errors.Samples.message}</p>
                    )} */}
                    </div>
                  </CardFooter>
                </Card>

                <Card className="h-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>Total Price: {totalPrice}</div>
                      <div>
                        <Button
                          // disabled={orders.values.length === 0}
                          className="flex gap-3"
                          type="submit"
                          color="primary"
                        >
                          <UploadCloud /> Submit Sample
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      showPagination={false}
                      showSearch={false}
                      showColumns={false}
                      searchKey="Test"
                      columns={columns}
                      data={orders}
                    />
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwoForm;
