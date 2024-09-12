"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PurchaseInfo from "./PurchaseInfo";
import PurchaseItem from "./Items";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { apiGetPurchaseByID } from "@/app/services/api/Purchases/Add";
import Loading from "@/components/ui/loading";

const FormSteps = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [purchaseData, setPurchaseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidId, setIsValidId] = useState(false);

  const purchaseId = pathname.split("/").pop(); // Extract the ID from the URL

  useEffect(() => {
    if (purchaseId && purchaseId !== "add") {
      // Fetch purchase data based on the ID
      apiGetPurchaseByID(purchaseId)
        .then((data: any) => {
          if (data) {
            setPurchaseData(data);
            setIsValidId(true);
            setCurrentStep(2); // Start with the second step
          } else {
            toast.error("Invalid purchase ID. Redirecting to add page...");
            router.push("/purchases/add");
          }
        })
        .catch((error: any) => {
          toast.error("Error fetching purchase. Redirecting to add page...");
          router.push("/purchases/add");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsValidId(false);
      setIsLoading(false);
      setCurrentStep(1); // Start with the first step
    }
  }, [purchaseId, router]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {isValidId && (
        <div className="flex justify-end mb-8 mt-4">
          {currentStep > 1 && (
            <Button variant="shadow" onClick={handlePrevStep}>
              Previous
            </Button>
          )}
          {currentStep < 2 && (
            <Button variant="shadow" onClick={handleNextStep}>
              Next
            </Button>
          )}
        </div>
      )}
      {currentStep === 1 && (
        <PurchaseInfo data={purchaseData} isEditMode={isValidId} />
      )}
      {currentStep === 2 && <PurchaseItem data={purchaseData} />}
    </div>
  );
};

export default FormSteps;
