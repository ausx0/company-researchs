"use client";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { apiGetPurchaseCategories } from "@/app/services/api/Purchases/Categories";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export default function PurchaseCategoriesDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["purchases-categories"], // Fix: Pass the queryKey as an array
    queryFn: apiGetPurchaseCategories,
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
