"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiGetAllOrders } from "@/app/services/api/Orders/AllOrders";

export default function OrdersDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lab-orders"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllOrders,
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
