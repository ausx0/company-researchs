import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import TestsDataTable from "./components/client";
import AddNewTest from "./components/AddNewTest";

const TestsPage = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Tests" description="" />
        <div>
          <AddNewTest />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <TestsDataTable />
      </div>
    </div>
  );
};

export default TestsPage;
