"use client";
import { apiGetLabOrderSamples } from "@/app/services/api/Orders/LabOrderSamples";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const OrderSamples = () => {
  const router = useRouter();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();

  const { data: OrderSamplesData, isLoading: OrderSamplesLoading } = useQuery({
    queryKey: ["order-samples"],
    queryFn: () => apiGetLabOrderSamples(orderId),
  });
  return (
    <>
      <div>SAmples</div>
    </>
  );
};

export default OrderSamples;
