import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const OrderAction = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">Order Actions</h1>
          </div>
        </CardHeader>
        <CardContent>Order Actions</CardContent>
      </Card>
    </>
  );
};

export default OrderAction;
