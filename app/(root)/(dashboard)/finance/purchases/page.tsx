import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import PurchaseModal from "./components/PurchaseModalForm";
import PurchasesDataTable from "./components/client";
import AddNewPurchase from "./components/AddNewPurchase";

const TestsPage = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Purchases" description="" />
        <div>
          <AddNewPurchase />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <PurchasesDataTable />
      </div>
    </div>
  );
};

export default TestsPage;
