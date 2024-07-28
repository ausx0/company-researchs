"use client";
import React, { Suspense } from "react";
import OrderInfo from "./components/OrderInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button, Spinner } from "@nextui-org/react";
import OrderSamples from "./components/OrderSamples";
import OrderPayment from "./components/OrderPayment";
import OrderAction from "./components/OrderAction";
import { usePathname, useRouter } from "next/navigation";
import { Edit } from "lucide-react";

const ViewOrder = () => {
  const router = useRouter();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();
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
                <Button
                  color="primary"
                  onPress={() => router.push(`/orders/${orderId}`)}
                >
                  <Edit /> Edit Order
                </Button>
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
