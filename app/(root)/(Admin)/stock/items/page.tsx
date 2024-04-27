import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNewItem from "./components/AddNewItem";
import ItemsDataTable from "./components/client";

const ItemsPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Items" description="" />
          <div>
            <AddNewItem />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <ItemsDataTable />
        </div>
      </div>
    </>
  );
};

export default ItemsPage;
