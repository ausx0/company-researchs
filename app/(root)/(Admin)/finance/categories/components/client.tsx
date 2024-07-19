"use client";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { apiGetExpenseCategories } from "@/app/services/api/Finance/Expenses/Categories";
export default function ExpenseCategoriesDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Expenses-categories"], // Fix: Pass the queryKey as an array
    queryFn: apiGetExpenseCategories,
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
