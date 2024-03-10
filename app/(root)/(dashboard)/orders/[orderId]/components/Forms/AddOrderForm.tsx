import SelectField from "@/app/(root)/(dashboard)/components/FormFields/SelectField";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Input } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { StepOneOrderSchema } from "../../validation/orderSchema";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import PatientModalForm from "@/app/(root)/(dashboard)/customers/patients/components/PatientModalForm";
import InputField from "@/app/(root)/(dashboard)/components/FormFields/InputField";
import { formatISO } from "date-fns";

interface AddOrderFormProps {
  control: Control<z.infer<typeof StepOneOrderSchema>>;
  errors: FieldErrors<z.infer<typeof StepOneOrderSchema>>;
  watch: any;
  setValue: any;
}

const AddOrderForm: React.FC<AddOrderFormProps> = ({
  control,
  errors,
  watch,
  setValue,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add this state
  const [modalKey, setModalKey] = useState(0); // Add this state

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
              name="patient_id"
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
              name="client_id"
              label="Client"
              errors={errors}
              options={ClientOptions()}
              isLoading={clientsLoading}
            />
          </div>
        )}

        <div className="flex flex-col gap-2 w-full">
          <Label>Referred</Label>
          <InputField
            // label="Order Name"
            name={"referred"}
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
      </div>
    </>
  );
};

export default AddOrderForm;
