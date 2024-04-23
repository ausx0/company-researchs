"use client";
import React, { useEffect, useState } from "react";
import { TestsData, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { apiGetTests } from "@/app/services/api/Tests";
import { useQuery } from "@tanstack/react-query";

export default function TestsDataTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["LabTests"], // Fix: Pass the queryKey as an array
    queryFn: apiGetTests,
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
