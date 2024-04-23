"use client";
import { apiGetOrder } from "@/app/services/api/Orders/AllOrders";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const OrderInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();

  const { data: OrderInfoData, isLoading: OrderInfoDataLoading } = useQuery({
    queryKey: ["order-info"],
    queryFn: () => apiGetOrder(orderId),
  });

  if (OrderInfoDataLoading) {
    return <Loading />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between  m-4">
            <h1 className="text-lg font-semibold uppercase">
              Order Information
            </h1>
          </div>{" "}
        </CardHeader>

        {!OrderInfoDataLoading && OrderInfoData ? (
          <CardContent className="px-10">
            <div className="flex flex-col gap-6 px-8 pb-4">
              <div className="flex justify-around">
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Order ID</h1>
                  <p className="leading-8 text-lg">
                    {OrderInfoData.Order_identifier}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Name</h1>
                  <p className="leading-8 text-lg">
                    {OrderInfoData.Client_name}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Date</h1>
                  <p className="leading-8 text-lg">{OrderInfoData.Date}</p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Type</h1>
                  <p className="leading-8 text-lg capitalize">
                    {OrderInfoData.Type === 1 ? "Patient" : "Client"}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Time</h1>
                  <p className="leading-8 text-lg">
                    {OrderInfoData.Order_identifier}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-around">
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">total</h1>
                  <p className="leading-8 text-lg">
                    {formatPrice(OrderInfoData.Total)}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Discount</h1>
                  <p className="leading-8 text-lg">{OrderInfoData.Discount}%</p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">
                    Before Discount
                  </h1>
                  <p className="leading-8 text-lg">
                    {formatPrice(OrderInfoData.BeforeDiscount)}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Paid</h1>
                  <p className="leading-8 text-lg capitalize">
                    {formatPrice(OrderInfoData.Paid)}
                  </p>
                </div>
                <div className="flex flex-col  flex-1">
                  <h1 className="font-bold text-lg uppercase">Referred</h1>
                  <p className="leading-8 text-lg">{OrderInfoData.Referred}</p>
                </div>
              </div>
            </div>
          </CardContent>
        ) : (
          <Loading />
        )}
      </Card>
    </>
  );
};

export default OrderInfo;
