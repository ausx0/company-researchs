"use client";
import React, { useEffect, useState } from "react";
import { SubTestsData, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { apiGetSubTests } from "@/app/services/api/SubTests";
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";

export default function SubTestsDataTable() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["LabSubTests"], // Fix: Pass the queryKey as an array
    queryFn: apiGetSubTests,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Sub Tests" description="" />
          <div>
            <Button
              className="uppercase"
              onClick={() => router.push("subTests/add")}
            >
              <PlusIcon /> Add Sub Test
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className=" mx-auto">
        <DataTable searchKey="ID" columns={columns} data={data} />
      </div>
    </>
  );
}
