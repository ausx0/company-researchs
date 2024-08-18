"use Supplier";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { apiGetSuppliers } from "@/app/services/api/Customers/Suppliers";

export default function SuppliersDataTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Lab-Suppliers"], // Fix: Pass the queryKey as an array
    queryFn: apiGetSuppliers,
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