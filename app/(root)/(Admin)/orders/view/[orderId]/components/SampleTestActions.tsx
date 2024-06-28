"use client";

import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal, Trash, View } from "lucide-react";

import toast from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderSamplesData, SubTest } from "./OrderSamplesColumns";
import { Can } from "@/app/Rules/Can";
import { apiDeleteOrderSampleTest } from "@/app/services/api/Orders/LabOrderSamples";

export interface cellActionProps {
  data: any;
}

export const OrderSampleTestCellAction: React.FC<cellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const DeleteOrderMutation = useMutation({
    mutationKey: ["delete-order-test"],
    mutationFn: apiDeleteOrderSampleTest,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      toast.success("Order Delete successfully");
      setLoading(false);
      // Invalidate the 'order-samples' query
      queryClient.invalidateQueries({
        queryKey: ["order-samples"],
      });
      // Invalidate the 'order-info' query
      queryClient.invalidateQueries({
        queryKey: ["order-info"],
      });
    },
    onError: () => {
      setLoading(false);
      toast.error("Something Wrong Happened ");
    },
  });
  const onDelete = async () => {
    // .log(`Order_id = ${data.Sample_id}`);
    DeleteOrderMutation.mutate({ Test_id: data.Test_id });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={handleClose}
        onConfirm={onDelete}
        loading={loading}
      />
      {/* Pass the ID as a prop */}
      {/* <Can I={"read"}> */}
      <Button
        className="bg-danger hover:bg-red-700"
        onClick={() => setOpen(true)}
      >
        <Trash />
      </Button>
      {/* </Can> */}
    </>
  );
};
