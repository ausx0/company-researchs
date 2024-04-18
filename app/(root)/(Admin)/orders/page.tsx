import { Heading } from "@/components/ui/heading";
import React from "react";
import AddNewOrder from "./components/AddNewOrder";
import { Separator } from "@/components/ui/separator";
import OrdersDataTable from "./components/client";

const OrdersPage = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Orders" description="" />
        <div>
          <AddNewOrder />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <OrdersDataTable />
      </div>
    </div>
  );
};

export default OrdersPage;
