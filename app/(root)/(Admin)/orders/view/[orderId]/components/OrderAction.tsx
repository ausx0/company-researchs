"use client";
import { Can } from "@/app/Rules/Can";
import { apiDeleteOrder } from "@/app/services/api/Orders/AllOrders";
import { AlertModal } from "@/components/modals/alert-modal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { Button } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface OrderData {
  BeforeDiscount: number;
  Client_id: number;
  Client_name: string;
  Completed: number;
  ID: any;
  // Add other properties as needed
}

const OrderAction = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useQuery<OrderData>({
    queryKey: ["order-info"],
  });

  const DeleteOrderMutate = useMutation({
    mutationKey: ["delete-order"],
    mutationFn: apiDeleteOrder,
  });

  const onDelete = () => {
    DeleteOrderMutate.mutate({ Order_id: data?.ID });
    setOpen(false);
    toast.success("Order Deleted Successfully");
    router.push("/orders");
  };

  useEffect(() => {
    if (data) {
      // .log("actions", data);
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
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={DeleteOrderMutate.isPending}
      />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">Order Actions</h1>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full flex gap-4">
            <Can I="read" a="Admin">
              {" "}
              {/* Updated prop names */}
              {data.Completed === 0 ? (
                <Button className="flex-1 bg-pending text-white">
                  Mark As Pending
                </Button>
              ) : (
                <Button className="flex-1 bg-cyan-400 text-white">
                  Mark As Complete
                </Button>
              )}
            </Can>
            <Button className="flex-1" color="primary">
              Print Results
            </Button>
            <Can I="read" a="Admin">
              <Button
                variant="solid"
                onPress={() => setOpen(true)}
                className="flex-1"
                color="danger"
              >
                <Trash /> Delete
              </Button>
            </Can>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OrderAction;
