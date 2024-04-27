import React, { Suspense } from "react";
import OrderInfo from "./components/OrderInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@nextui-org/react";
import OrderSamples from "./components/OrderSamples";
import OrderPayment from "./components/OrderPayment";
import OrderAction from "./components/OrderAction";

const ViewOrder = () => {
  return (
    <>
      <Card className=" p-4 bg-gray-100 h-auto">
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-2xl font-semibold uppercase">Order</h1>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <OrderInfo />
          <Card>
            <CardHeader>
              {" "}
              <div className="flex justify-between items-center m-4">
                <h1 className="text-lg font-semibold uppercase">
                  Samples And Tests
                </h1>
              </div>
            </CardHeader>
            <CardContent>
              <OrderSamples />
            </CardContent>
          </Card>
          <OrderPayment />
          <OrderAction />
        </CardContent>
      </Card>
    </>
  );
};

export default ViewOrder;
