"use client";
import SelectField from "@/app/(root)/(Admin)/components/FormFields/SelectField";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import PatientModalForm from "@/app/(root)/(Admin)/customers/patients/components/PatientModalForm";
import InputField from "@/app/(root)/(Admin)/components/FormFields/InputField";
import { formatISO } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  apiCreateOrder,
  apiGetOrder,
} from "@/app/services/api/Orders/AllOrders";
import { StepOneOrderSchema } from "../validation/orderSchema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import ButtonLoader from "../../../components/UI/ButtonLoader";
import { format } from "date-fns";
interface OrderFormProps {
  ID?: number | string | undefined;
}

interface OrderData {
  Type: number;
  Patient_id: number; // if patient_id is also a number
  Client_id: number;
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
    queryKey: ["Lab-Orders"],
    queryFn: () => (ID ? apiGetOrder(ID) : Promise.resolve(null)),
  });

  const defaultValues = orderData
    ? {
        Type: orderData.Type,
        Patient_id: Number(orderData.Patient_id),
        Client_id: Number(orderData.Client_id),
        Referred: orderData.Referred,
        Date: format(new Date(orderData.Date), "yyyy-MM-dd"),
        Notes: orderData.Notes,
      }
    : {
        Type: 1,
        Patient_id: undefined,
        Client_id: undefined,
        Referred: "",
        Date: format(new Date(), "yyyy-MM-dd"),
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

  const {
    isPending: AddOrderLoading,
    mutate: AddOrderMutation,
    isSuccess,
  } = useMutation({
    mutationKey: ["AddOrder"],
    mutationFn: apiCreateOrder,
    onSuccess: (data) => {
      // .log(data);
      if (data.State === "OK") {
        toast.success("Order added successfully");
        router.push(`/orders/${data.Order_id}`);
      }
    },
    onError: (error) => {
      toast.error("Error adding order");
    },
  });

  const onSubmit = (data: z.infer<typeof StepOneOrderSchema>) => {
    // Here you can access the form data

    AddOrderMutation(data);
    // Perform any actions you need, such as sending the data to a server
    // ...
  };

  console.log(ID);

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
        value: 1,
        label: "Patient",
      },
      {
        value: 2,
        label: "Client",
      },
    ];
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalKey((prevKey) => prevKey + 1); // Increment the key every time the modal is closed
  };
  useEffect(() => {
    setValue("Date", format(new Date(), "yyyy-MM-dd"));
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
              isDisabled={ID === undefined ? false : true}
              control={control}
              name="Type"
              label="Order Type"
              errors={errors}
              options={OrderTypeOptions()}
            />
          </div>
          {watch("Type") === 1 && (
            <div>
              <div className="flex items-center py-2">
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
          {watch("Type") === 2 && (
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
                type="text"
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
              disabled={AddOrderLoading || isSuccess}
              // disabled={AddOrderLoading}
            >
              {AddOrderLoading || isSuccess ? (
                <Spinner color="default" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
