import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import InputField from "../../components/FormFields/InputField";
import { Input } from "@nextui-org/react";
import OrderForm from "./components/OrderForm";

const AddOrder = () => {
  return (
    <>
      <Card className="h-auto p-4 bg-gray-100">
        <div className="flex justify-between items-center m-4">
          <h1 className="text-2xl font-semibold uppercase">Add Order</h1>
        </div>
        {/* <Separator /> */}
        <OrderForm />
      </Card>
    </>
  );
};

export default AddOrder;
