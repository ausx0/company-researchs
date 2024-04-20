import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const OrderPayment = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">Payment History</h1>
          </div>
        </CardHeader>
        <CardContent>Payment History</CardContent>
      </Card>
    </>
  );
};

export default OrderPayment;
