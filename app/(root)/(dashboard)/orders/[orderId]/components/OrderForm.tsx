"use client";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Input } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StepOneOrderSchema } from "../validation/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectField from "../../../components/FormFields/SelectField";
import StepOneForm from "./FormSteps/stepOneForm";
import { CheckIcon } from "lucide-react";
import StepTwoForm from "./FormSteps/stepTwoForm";

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // Add this state

  const handleNext = () => {};
  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const isLastStep = currentStep === 2;
  const isFirstStep = currentStep === 1;

  const {
    register,
    watch,
    getValues,
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof StepOneOrderSchema>>({
    resolver: zodResolver(StepOneOrderSchema),
    defaultValues: {
      Date: "",
      Type: "1",
      Client_id: "",
      Patient_id: "",
      Notes: "",
      Samples: [],
      // Cost: "",
      // Discount: "",
      // BeforeDiscount: "",
      // Total: "",
      // Status: "",
      // Sample_id: [],
    },
  });
  const onSubmit = (values: z.infer<typeof StepOneOrderSchema>) => {
    if (currentStep === 1) {
      console.log(values);
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("post", values);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 my-8">
        <div className="flex justify-center items-center">
          <div className="w-1/2 flex justify-center items-center">
            <div>
              <CheckIcon />
            </div>
            <hr
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#e1d4d4",
                margin: "0 20px",
              }}
            />
            <div>
              <CheckIcon />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between h-full">
            <div>
              {currentStep === 1 && (
                <StepOneForm control={control} errors={errors} watch={watch} />
              )}
              {currentStep === 2 && (
                <StepTwoForm
                  getValues={getValues}
                  reset={reset}
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
              )}
            </div>
            <div
              className="m-10"
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
                padding: "10px",
              }}
            >
              <button type="button" onClick={handlePrev} disabled={isFirstStep}>
                Previous
              </button>
              {!isLastStep && <button type="submit">Next</button>}
              {isLastStep && <button type="submit">Submit</button>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
