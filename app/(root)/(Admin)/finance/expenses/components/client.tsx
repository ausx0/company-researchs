"use client";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiGetExpenses } from "@/app/services/api/Finance/Expenses";

export default function ExpensesDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Lab-Expenses"], // Fix: Pass the queryKey as an array
    queryFn: apiGetExpenses,
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
