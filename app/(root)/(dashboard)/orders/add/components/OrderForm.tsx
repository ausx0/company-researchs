"use client";
import SelectField from "@/app/(root)/(dashboard)/components/FormFields/SelectField";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Button, Input } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import PatientModalForm from "@/app/(root)/(dashboard)/customers/patients/components/PatientModalForm";
import InputField from "@/app/(root)/(dashboard)/components/FormFields/InputField";
import { formatISO } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  apiCreateOrder,
  apiGetOrder,
} from "@/app/services/api/Orders/AllOrders";
import { StepOneOrderSchema } from "../validation/orderSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface OrderFormProps {
  ID?: number;
}

interface OrderData {
  Type: string;
  Patient_id: string; // if patient_id is also a number
  Client_id: string;
  Referred: string;
  Date: string;
  Notes: string;
  // Add other properties as needed
}
// ...

const OrderForm: React.FC<OrderFormProps> = ({ ID }) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [modalKey, setModalKey] = useState(0); // Add this state

  const { data: orderData } = useQuery<OrderData>({
    queryKey: ["Order", ID],
    queryFn: () => (ID ? apiGetOrder(ID) : Promise.resolve(null)),
  });

  const defaultValues = orderData
    ? {
        Type: orderData.Type,
        // patient_id: Number(orderData.patient_id), // convert to number
        Client_id: Number(orderData.Client_id), // convert to number
        Referred: orderData.Referred,
        Date: orderData.Date,
        Notes: orderData.Notes,
      }
    : {
        Type: "1",
        patient_id: undefined, // set to undefined
        client_id: undefined, // set to undefined
        referred: "",
        Date: "",
        Notes: "",
      };

  const {
    control,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof StepOneOrderSchema>>({
    resolver: zodResolver(StepOneOrderSchema),
    defaultValues,
  });

  const AddOrderMutation = useMutation({
    mutationKey: ["AddOrder"],
    mutationFn: apiCreateOrder,
    onSuccess: (data) => {
      console.log(data);
      if (data.State === "OK") {
        toast.success("Order added successfully");
        router.push(`/orders/${data.Order_id}`);
      }
    },
  });

  const onSubmit = (data: z.infer<typeof StepOneOrderSchema>) => {
    // Here you can access the form data

    console.log(data);
    AddOrderMutation.mutate(data);
    // Perform any actions you need, such as sending the data to a server
    // ...
  };

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

  const OrderTypeOptions = () => {
    return [
      {
        value: "1",
        label: "Patient",
      },
      {
        value: "2",
        label: "Client",
      },
    ];
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKey((prevKey) => prevKey + 1); // Increment the key every time the modal is closed
  };

  useEffect(() => {
    const today = new Date();
    const todayISO = formatISO(today, { representation: "date" });
    setValue("Date", todayISO);
  }, [setValue]);

  return (
    <>
      <PatientModalForm
        key={modalKey} // Add the key prop here
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Add this line */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 m-6">
          <div>
            <SelectField
              control={control}
              name="Type"
              label="Order Type"
              errors={errors}
              options={OrderTypeOptions()}
            />
          </div>
          {watch("Type") === "1" && (
            <SelectField
              control={control}
              name="Client_id"
              label="Patient"
              errors={errors}
              options={PatientOptions()}
              isLoading={patientsLoading}
            />
          )}
          {watch("Type") === "2" && (
            <SelectField
              control={control}
              name="Client_id"
              label="Client"
              errors={errors}
              options={ClientOptions()}
              isLoading={clientsLoading}
            />
          )}
          {/* {watch("Type") === "1" && (
            <div>
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
                name="Client_id"
                label=""
                errors={errors}
                options={PatientOptions()}
                isLoading={patientsLoading}
              />
            </div>
          )}

          {watch("Type") === "2" && (
            <div>
              <SelectField
                control={control}
                name="Client_id"
                label="Client"
                errors={errors}
                options={ClientOptions()}
                isLoading={clientsLoading}
              />
            </div>
          )} */}

          <div className="flex flex-col gap-2 w-full">
            <Label>Referred</Label>
            <InputField
              // label="Order Name"
              name={"Referred"}
              type="text"
              control={control}
              errors={errors}

              // placeholder="Order Name"
              // control={undefined}
              // errors={undefined}
            />
          </div>

          <div className="flex gap-12 ">
            <div className="flex flex-col gap-2 w-full">
              <Label>Date</Label>
              <InputField
                // label="Order Name"
                name={"Date"}
                type="date"
                control={control}
                errors={errors}

                // placeholder="Order Name"
                // control={undefined}
                // errors={undefined}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Note</Label>
              <InputField
                // label="Order Name"
                name={"Notes"}
                type="text"
                control={control}
                errors={errors}

                // placeholder="Order Name"
                // control={undefined}
                // errors={undefined}
              />
            </div>
          </div>
          <div className="flex items-end flex-row-reverse ">
            <Button
              type="submit"
              color="primary"
              className="w-[10rem] p-4 px-5"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
