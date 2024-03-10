import React from "react";
import OrderForm from "./components/OrderForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AddOrder = () => {
  return (
    <>
      <Card>
        <CardHeader>Order</CardHeader>
        <CardContent>
          <OrderForm />
        </CardContent>
      </Card>
    </>
  );
};

export default AddOrder;
