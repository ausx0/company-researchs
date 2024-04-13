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
import { PurchasesData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiDeletePurchase,
  apiGetPurchase,
} from "@/app/services/api/Finance/Purchases";
import PurchaseModal, { Purchase } from "./PurchaseModalForm";
import { useDisclosure } from "@nextui-org/react";
import PurchaseModalForm from "./PurchaseModalForm";

export interface cellActionProps {
  data: PurchasesData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const handleEdit = async () => {
    const Purchase = await apiGetPurchase(data.ID); // Fetch the Purchase data
    setEditingPurchase(Purchase); // Set the Purchase being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeletePurchaseMutation = useMutation({
    mutationKey: ["DeletePurchase"],
    mutationFn: apiDeletePurchase,
    onSuccess: () => {
      toast.success("Purchase Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["LabPurchases"],
      }); // Invalidate the 'Purchases' query
    },
  });
  const onDelete = async () => {
    console.log(`Purchase_id = ${data.ID}`);
    DeletePurchaseMutation.mutate({ Purchase_id: data.ID });
    setOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <PurchaseModalForm
        isOpen={isOpen}
        onClose={onClose}
        Purchase={editingPurchase}
      />
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
