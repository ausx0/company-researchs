"use client";

import {
  Barcode,
  Copy,
  Delete,
  Edit,
  Edit2,
  MoreHorizontal,
  Trash,
  View,
} from "lucide-react";

import toast from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteOrderSample } from "@/app/services/api/Orders/LabOrderSamples";
import { OrderSamplesData } from "./OrderSamplesColumns";
import { Can } from "@/app/Rules/Can";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface cellActionProps {
  data: OrderSamplesData;
}

export const OrderSampleCellAction: React.FC<cellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();

  const DeleteOrderMutation = useMutation({
    mutationKey: ["delete-order-sample"],
    mutationFn: apiDeleteOrderSample,
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
      // Invalidate the 'order-info' query
      queryClient.invalidateQueries({
        queryKey: ["Lab-Orders"],
      });
    },
    onError: () => {
      setLoading(false);
      toast.error("Something Wrong Happened ");
      queryClient.invalidateQueries({
        queryKey: ["order-samples"],
      });
      // Invalidate the 'order-info' query
      queryClient.invalidateQueries({
        queryKey: ["order-info"],
      });
      // Invalidate the 'order-info' query
      queryClient.invalidateQueries({
        queryKey: ["Lab-Orders"],
      });
    },
  });
  const onDelete = async () => {
    // .log(`Order_id = ${data.Sample_id}`);
    DeleteOrderMutation.mutate({ Sample_id: data.Sample_id });
    onOpenChange();
  };

  const handleClick = () => {
    // Show the loading toast and get its ID
    const toastId = toast.loading("Barcode Loading...");

    // After 5 seconds, update the toast to success
    setTimeout(() => {
      toast.success("Success!", {
        id: toastId,
      });
    }, 3000); // 5 seconds
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Delete Sample</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this sample?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="bordered" color="danger" onClick={onDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Pass the ID as a prop */}
      {/* <Can I={"read"}> */}
      <div className="flex gap-2 p-2">
        <Button
          color="primary"
          onPress={() => router.push(`/result/${data.Sample_id}`)}
        >
          <Edit2 color="white" />
        </Button>
        <Button
          className="bg-slate-600 hover:bg-slate-500"
          onPress={handleClick}
        >
          <Barcode color="white" />
        </Button>
        <Button className="bg-danger hover:bg-red-700" onPress={onOpen}>
          <Trash color="white" />
        </Button>
      </div>
      {/* </Can> */}
    </>
  );
};
