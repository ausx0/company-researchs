"use client";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import { Button, Input } from "@nextui-org/react";
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
import { usePathname } from "next/navigation";
import OrderForm from "../../add/components/OrderForm";

const OrderFormDynamic = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  console.log("this is the id", id);
  const [currentStep, setCurrentStep] = useState(2); // Add this state

  const handleNext = () => {};
  const handlePrev = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const isLastStep = currentStep === 2;
  const isFirstStep = currentStep === 1;

  const handleStepOne = () => {
    setCurrentStep(1);
  };

  const handleStepTwo = () => {
    setCurrentStep(2);
  };

  return (
    <>
      <div className="flex gap-4 items-center justify-end ">
        <Button
          color={currentStep === 1 ? "primary" : "default"}
          type="button"
          // variant={currentStep === 1 ? "solid" : ""}
          onClick={handleStepOne}
        >
          Order
        </Button>
        <Button
          type="button"
          color={currentStep === 2 ? "primary" : "default"}
          onClick={handleStepTwo}
        >
          Samples & Payment
        </Button>
      </div>
      <div className="flex flex-col gap-8 my-8">
        <div className="flex flex-col justify-between h-full">
          <div>
            {currentStep === 1 && <OrderForm ID={id} />}
            {currentStep === 2 && <StepTwoForm />}
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
      </div>
    </>
  );
};

export default OrderFormDynamic;
