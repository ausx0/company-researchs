import { DataTable } from "@/components/ui/data-table";
import React from "react";
import TestsDataTable from "./components/client";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";

const TestsPage = () => {
  return (
    <div className="container mx-auto py-2">
      <Heading title="Tests" description="" />
      <Separator />
      <div className="py-4">
        <TestsDataTable />
      </div>
    </div>
  );
};

export default TestsPage;
