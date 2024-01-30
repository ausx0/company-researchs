"use client";
import React, { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Tests from "@/app/services/api/Tests";

export default function TestsDataTable() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Tests.get();
      console.log(result);
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto ">
      <DataTable searchKey="email" columns={columns} data={data} />
    </div>
  );
}
