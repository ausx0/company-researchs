"use client";
import React from "react";
import { SamplesData, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { apiGetSamples } from "@/app/services/api/Samples";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SamplesDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["LabSamples"], // Fix: Pass the queryKey as an array
    queryFn: apiGetSamples,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto ">
      <DataTable searchKey="ID" columns={columns} data={data} />
    </div>
  );
}
