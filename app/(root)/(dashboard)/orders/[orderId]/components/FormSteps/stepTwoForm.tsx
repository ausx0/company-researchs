/* eslint-disable react-hooks/exhaustive-deps */
import SelectField from "@/app/(root)/(dashboard)/components/FormFields/SelectField";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrderTestsSchema } from "../../validation/orderSchema";
import { z } from "zod";
import { Plus, UploadCloud, Wand } from "lucide-react";
import PatientModalForm from "@/app/(root)/(dashboard)/customers/patients/components/PatientModalForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiGetSamples } from "@/app/services/api/Samples";
import {
  apiAddOrderTest,
  apiGetSubTestsByTest,
  apiGetTestsBySample,
} from "@/app/services/api/Orders/OrderForm";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { apiGetOrder } from "@/app/services/api/Orders/AllOrders";
import { usePathname } from "next/navigation";
import Loading from "@/components/ui/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
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

  console.log("this is the id", id);

  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [modalKey, setModalKey] = useState(0); // Add this state
  const [orders, setOrders] = useState<any[]>([]); // Add this state
  const [editingOrderIndex, setEditingOrderIndex] = useState(null);
  const [pendingSampleId, setPendingSampleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      Order_id: id,
      Sample_id: undefined,
      Tests: [
        {
          Test_id: undefined,
          SubTest_id: [],
        },
      ],
      Patient_id: undefined,
    },
  });

  const handleAddSample = () => {
    const Test = getValues("Test_id");
    const SubTest = getValues("SubTest_id");

    // Get the label for the Test and SubTest
    const TestLabel = TestsOptions().find(
      (option) => option.value === Test
    )?.label;
    const SubTestLabels = SubTest.map(
      (subTestId) =>
        SubTestsOptions().find((option) => option.value === subTestId)?.label
    );

    const newOrder = {
      ID: orders.length + 1, // Add this line
      Test: { id: Test, label: TestLabel },
      SubTest: SubTest.map((id, index) => ({
        id,
        label: SubTestLabels[index],
      })),
    };

    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      return updatedOrders;
    });
  };
  // setValue("Tests", orders); // Set the "Samples" field value to the orders state

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

  const AddTestOrder = useMutation({
    mutationKey: ["AddTestOrder"],
    mutationFn: apiAddOrderTest,
    onSuccess: () => {
      toast.success("Test added successfully");
      // queryClient.invalidateQueries({
      //   queryKey: ["LabOrders"],
      // }); // Invalidate the 'Orders' query
    },
  });

  const onSubmit = (data: z.infer<typeof OrderTestsSchema>) => {
    // Here you can access the form data
    console.log("data", data);

    // Include the orders state in the data that's being sent to the server
    const dataWithOrders = {
      ...data,
      Tests: orders.map((order) => ({
        Test_id: order.Test.id,
        SubTest_id: order.SubTest.map((subTest) => subTest.id),
      })),
    };

    AddTestOrder.mutate(dataWithOrders);

    // Perform any actions you need, such as sending the data to a server
    // ...
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKey((prevKey) => prevKey + 1); // Increment the key every time the modal is closed
  };

  const handleSampleChange = (newSampleId: any) => {
    if (sampleId != "") setPendingSampleId(newSampleId);
    setOpen(true);
  };

  console.log("sample id", sampleId);

  const selectAllSubTests = () => {
    const allSubTestsIds = SubTestsOptions().map(
      (option: OptionType) => option.value
    );
    setValue("SubTest_id", allSubTestsIds);
  };

  useEffect(() => {
    if (sampleId) {
      TestsMutation.mutate(sampleId); // Trigger the mutation when "sample_id" changes
      setValue("Test_id", ""); // Reset the "test_id" field
      setValue("SubTest_id", ""); // Reset the "SubTest_id" field
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sampleId]);

  const TestData = TestsMutation.data;

  const TestsOptions = () => {
    if (!TestData) return [];
    return TestData.map((item: any) => ({
      value: item.ID,
      label: item.Test,
    }));
  };

  const testId = watch("Test_id"); // Watch the "testId" field
  console.log("testId:", testId); // Log the testId value

  useEffect(() => {
    console.log("mutating with testId:", testId); // Log the testId value before mutation

    if (testId) {
      console.log("mutating with testId:", testId); // Log the testId value before mutation
      SubTestsMutation.mutate(testId); // Trigger the mutation when "testId" changes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const SubTestData = SubTestsMutation.data;

  const SubTestsOptions = () => {
    if (!SubTestData) return [];
    return SubTestData.map((item: any) => ({
      value: item.ID,
      label: item.SubTest,
    }));
  };

  // useEffect(() => {
  //   console.log("Tests", orders);
  // }, [orders]);

  // useEffect(() => {
  //   if (sampleId) {
  //     setOpen(true); // Open the modal
  //   }
  //   // Other code...
  // }, [sampleId]);

  // useEffect(() => {
  //   if (SamplesData) {
  //     setValue("Sample_id", SamplesData[0].ID);
  //   }
  // }, [SamplesData]);

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setValue("Sample_id", pendingSampleId);
          setPendingSampleId("");
          setOpen(false);
        }}
        loading={loading}
        title="This Action Will Reset The Tests Table"
      />
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
                    {orderData.Type === "1" ? "Client" : "Patient"}
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
            <div className="flex flex-col gap-10 w-3/12 h-full">
              <Card className="shadow-lg h-[50vh]">
                <CardHeader>Total</CardHeader>
                <Separator />
                <CardContent>
                  <div>1000IQD</div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-10 w-3/4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="shadow-lg h-auto w-full">
                  <CardHeader>Sample Information </CardHeader>
                  <Separator />
                  <CardContent className="m-4 flex gap-8 flex-col">
                    <div className="flex gap-4 w-auto">
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
                          name="patient_id"
                          label=""
                          errors={errors}
                          options={PatientOptions()}
                          isLoading={patientsLoading}
                        />
                      </div>
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
                          name="Test_id"
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
                          name="SubTest_id"
                          options={SubTestsOptions()} // Pass the options directly
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
                      <div>New Tests</div>
                      <div>
                        <Button className="flex gap-3" type="submit">
                          <UploadCloud /> Submit Tests
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
