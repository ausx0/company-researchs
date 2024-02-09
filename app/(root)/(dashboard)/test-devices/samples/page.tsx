import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import AddSampleModal from "./components/addSampleModal";
import SamplesDataTable from "./components/client";

const TestsPage = () => {
  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Tests" description="" />
        <div>
          <AddSampleModal />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <SamplesDataTable />
      </div>
    </div>
  );
};

export default TestsPage;
