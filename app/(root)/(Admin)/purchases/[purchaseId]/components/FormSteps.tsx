"use client";
import { usePathname } from "next/navigation";
import React from "react";
import PurchaseInfo from "./PurchaseInfo";

const FormSteps = () => {
  const pathname = usePathname();
  return (
    <div>
      <PurchaseInfo data={null} />
    </div>
  );
};

export default FormSteps;
