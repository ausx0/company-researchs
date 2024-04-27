import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNewInventory from "./components/AddNewInventory";
import InventoryDataTable from "./components/client";

const InventoryPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Inventory" description="" />
          <div>
            <AddNewInventory />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <InventoryDataTable />
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
