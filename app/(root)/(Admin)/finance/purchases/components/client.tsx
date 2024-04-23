"use client";
import React from "react";
import { PurchasesData, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiGetPurchases } from "@/app/services/api/Finance/Purchases";

export default function PurchasesDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["LabPurchases"], // Fix: Pass the queryKey as an array
    queryFn: apiGetPurchases,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className=" mx-auto ">
      <DataTable searchKey="ID" columns={columns} data={data} />
    </div>
  );
}
