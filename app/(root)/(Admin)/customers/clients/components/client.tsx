"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { apiGetClients } from "@/app/services/api/Customers/Clients";

export default function ClientsDataTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Lab-Clients"], // Fix: Pass the queryKey as an array
    queryFn: apiGetClients,
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
