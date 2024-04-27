"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiGetAllInventory } from "@/app/services/api/Inventory";

export default function InventoryDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Inventory"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllInventory,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className=" mx-auto">
      <DataTable searchKey="ID" columns={columns} data={data} />
    </div>
  );
}
