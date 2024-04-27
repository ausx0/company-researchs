"use client";

import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { OrdersData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@nextui-org/react";
import {
  apiDeleteOrder,
  apiGetOrder,
} from "@/app/services/api/Orders/AllOrders";

export interface cellActionProps {
  data: OrdersData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<null>(null);

  const handleEdit = async () => {
    const Order = await apiGetOrder(data.ID); // Fetch the Order data
    setEditingOrder(Order); // Set the Order being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteOrderMutation = useMutation({
    mutationKey: ["DeleteOrder"],
    mutationFn: apiDeleteOrder,
    onSuccess: () => {
      toast.success("Order Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["lab-orders"],
      }); // Invalidate the 'Orders' query
    },
  });
  // const onDelete = async () => {
  //   console.log(`Order_id = ${data.ID}`);
  //   DeleteOrderMutation.mutate({ Order_id: data.ID });
  //   setOpen(false);
  // };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        // onConfirm={onDelete}
        loading={loading}
      /> */}
      {/* <OrderModalForm isOpen={isOpen} onClose={onClose} Order={editingOrder} /> */}
      {/* Pass the ID as a prop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions Menu</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onCopy(data.ID)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};