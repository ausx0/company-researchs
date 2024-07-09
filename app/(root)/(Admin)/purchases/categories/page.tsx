import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import AddNewPurchaseCategories from "./components/AddNewPurchaseCategories";
import PurchaseCategoriesDataTable from "./components/client";

const PurchaseCategoriesPage = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Purchase Categories" description="" />
        <div>
          <AddNewPurchaseCategories />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <PurchaseCategoriesDataTable />
      </div>
    </div>
  );
};

export default PurchaseCategoriesPage;
