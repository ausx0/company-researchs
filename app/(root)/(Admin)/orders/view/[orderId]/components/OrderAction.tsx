"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

interface OrderData {
  BeforeDiscount: number;
  Client_id: number;
  Client_name: string;
  Completed: number;
  // Add other properties as needed
}

const OrderAction = () => {
  const { data, isLoading, isError } = useQuery<OrderData>({
    queryKey: ["order-info"],
  });

  useEffect(() => {
    if (data) {
      console.log("actions", data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">Order Actions</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full flex gap-4">
            {data.Completed === 0 ? (
              <Button className="flex-1 bg-pending text-white">
                Mark As Pending
              </Button>
            ) : (
              <Button className="flex-1 bg-cyan-400 text-white">
                Mark As Complete
              </Button>
            )}
            <Button className="flex-1" color="primary">
              Print Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderAction;
