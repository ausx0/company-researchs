import SelectField from "@/app/(root)/(dashboard)/components/FormFields/SelectField";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { CardBody, Input } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StepOneOrderSchema } from "../../validation/orderSchema";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Edit, Plus, Trash } from "lucide-react";
import PatientModalForm from "@/app/(root)/(dashboard)/customers/patients/components/PatientModalForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiGetSamples } from "@/app/services/api/Samples";
import { apiGetTest, apiGetTests } from "@/app/services/api/Tests";
import { Button } from "@/components/ui/button";

interface StepTwoFormProps {
  control: Control<z.infer<typeof StepOneOrderSchema>>;
  errors: FieldErrors<z.infer<typeof StepOneOrderSchema>>;
  watch: any;
  getValues: any;
  reset: any;
  setValue: any;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  control,
  errors,
  watch,
  getValues,
  reset,
  setValue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [modalKey, setModalKey] = useState(0); // Add this state
  const [orders, setOrders] = useState<any[]>([]); // Add this state
  const [editingOrderIndex, setEditingOrderIndex] = useState(null);

  const handleAddOrder = () => {
    const patientId = getValues("order_type");
    const sampleId = getValues("sample_id");
    const testId = getValues("testId");
    const orderTypeId = getValues("order_type");

    const patient = PatientOptions().find(
      (option) => option.value === patientId
    )?.label;
    const sample = SamplesOptions().find(
      (option) => option.value === sampleId
    )?.label;
    const test = TestsOptions().find(
      (option) => option.value === testId
    )?.label;
    const orderType = orderTypeId === "1" ? "Patient" : "Client";

    const newOrder = { patient, sample, test, orderType };

    if (editingOrderIndex !== null) {
      setOrders((prevOrders) =>
        prevOrders.map((order, index) =>
          index === editingOrderIndex ? newOrder : order
        )
      );
      setEditingOrderIndex(null);
    } else {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    }
  };

  const handleDeleteOrder = (index: number) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const handleEditOrder = (index: any) => {
    const order = orders[index];
    reset(order); // Populate the form with the order's current values
    setEditingOrderIndex(index); // Set the editing order index
  };

  setValue("Samples", orders); // Set the "Samples" field value to the orders state
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
    data: clientsData,
    isLoading: clientsLoading,
    isFetching: clientsFetching,
    error: clientsError,
  } = useQuery({
    queryKey: ["Lab-Clients"],
    queryFn: apiGetClients,
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

  const sampleId = watch("sample_id"); // Watch the "sample_id" field

  const TestsMutation = useMutation({
    mutationKey: ["Lab-Tests"],
    mutationFn: apiGetTest,
  });

  const PatientOptions = () => {
    if (!patientsData) return [];
    return patientsData.map((item: any) => ({
      value: item.ID,
      label: item.Name,
    }));
  };

  const ClientOptions = () => {
    if (!clientsData) return [];
    return clientsData.map((item: any) => ({
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKey((prevKey) => prevKey + 1); // Increment the key every time the modal is closed
  };

  useEffect(() => {
    if (sampleId) {
      TestsMutation.mutate(String(sampleId)); // Trigger the mutation when "sample_id" changes
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
  return (
    <>
      <div className="flex flex-row-reverse gap-10">
        <div className="flex flex-col gap-10 w-4/12">
          <Card className="shadow-lg h-full">
            <CardHeader>Total</CardHeader>
            <Separator />
            <CardContent>
              <div>1000IQD</div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col w-full">
          <Card className="shadow-lg">
            <CardHeader>Sample Information </CardHeader>
            <Separator />
            <CardContent className="m-4 flex gap-8 flex-col">
              <div className="flex gap-4 w-auto">
                <div className="flex flex-col w-full gap-4">
                  <SelectField
                    errors={errors}
                    isLoading={patientsLoading}
                    label="Patient"
                    control={control}
                    name="order_type"
                    options={PatientOptions()}
                  />
                </div>
                <div className="flex flex-col w-full  gap-4">
                  <SelectField
                    errors={errors}
                    isLoading={SamplesLoading}
                    label="Samples"
                    control={control}
                    name="sample_id"
                    options={SamplesOptions()}
                  />
                </div>
              </div>
              <div className="flex gap-4 w-auto">
                <div className="flex flex-col w-full gap-4">
                  <SelectField
                    errors={errors}
                    isLoading={patientsLoading}
                    label="Tests"
                    control={control}
                    name="testId"
                    options={TestsOptions()}
                  />
                </div>
                <div className="flex flex-col w-full  gap-4">
                  <SelectField
                    errors={errors}
                    isLoading={patientsLoading}
                    label="Order Type"
                    control={control}
                    name="order_type"
                    options={[
                      {
                        value: "1",
                        label: "Patient",
                      },
                      {
                        value: "2",
                        label: "Client",
                      },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-row gap-8 my-6 flex-wrap">
        {orders.map((order, index) => (
          <Card key={index} className="shadow-lg w-[30%]">
            <CardHeader className="flex justify-between flex-row">
              <div>Order {index + 1}</div>
              <div className="flex gap-2">
                <Button onClick={() => handleEditOrder(index)}>
                  <Edit />
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteOrder(index)}
                >
                  <Trash />
                </Button>
              </div>
            </CardHeader>
            <Separator />
            <CardContent>
              <div>Patient: {order.patient}</div>
              <div>Sample: {order.sample}</div>
              <div>Test: {order.test}</div>
              <div>Order Type: {order.orderType}</div>
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center items-center">
          <button
            onClick={handleAddOrder}
            className="bg-primary-500 text-white rounded p-2 h-[3rem]"
          >
            {editingOrderIndex !== null ? "Update Sample" : "Add Sample"}
          </button>
          {errors.Samples && (
            <p className="text-danger">{errors.Samples.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepTwoForm;
