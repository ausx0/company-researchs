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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useDisclosure } from "@nextui-org/react";
import PurchaseCategoryModalForm from "./PurchaseCategoriesModalForm";
import {
  apiDeletePurchaseCategory,
  apiGetPurchaseCategory,
} from "@/app/services/api/Purchases/Categories";
import { PurchaseCategoriesData } from "./columns";

export interface cellActionProps {
  data: PurchaseCategoriesData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPurchaseCategory, setEditingPurchaseCategory] =
    useState<PurchaseCategoriesData | null>(null);

  const handleEdit = async () => {
    if (!data.ID) {
      toast.error("Invalid ID");
      return;
    }
    const PurchaseCategory = await apiGetPurchaseCategory(data.ID); // Fetch the PurchaseCategory data
    setEditingPurchaseCategory(PurchaseCategory); // Set the PurchaseCategory being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeletePurchaseCategoryMutation = useMutation<any>({
    mutationKey: ["DeletePurchaseCategory"],
    mutationFn: apiDeletePurchaseCategory,
    onSuccess: () => {
      toast.success("PurchaseCategory Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["purchases-categories"],
      }); // Invalidate the 'PurchaseCategorys' query
    },
  });
  const onDelete = async () => {
    // .log(`PurchaseCategory_id = ${data.ID}`);
    DeletePurchaseCategoryMutation.mutate({ Category_id: data.ID });
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
      <PurchaseCategoryModalForm
        isOpen={isOpen}
        onClose={onClose}
        PurchasesCategories={editingPurchaseCategory} // Corrected prop name
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
