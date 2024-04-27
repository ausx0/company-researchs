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
import { ItemsData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ItemModal, { Item } from "./ItemModalForm";
import { useDisclosure } from "@nextui-org/react";
import ItemModalForm from "./ItemModalForm";
import { apiDeleteItem, apiGetItem } from "@/app/services/api/Inventory/Items";

export interface cellActionProps {
  data: ItemsData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleEdit = async () => {
    const Item = await apiGetItem(data.ID); // Fetch the Item data
    console.log(data.ID);
    setEditingItem(Item); // Set the Item being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteItemMutation = useMutation({
    mutationKey: ["DeleteItem"],
    mutationFn: apiDeleteItem,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Item Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["Items"],
      }); // Invalidate the 'Items' query
      setOpen(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const onDelete = async () => {
    console.log(`Item_id = ${data.ID}`);
    DeleteItemMutation.mutate({ Item_id: data.ID });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <ItemModalForm isOpen={isOpen} onClose={onClose} Item={editingItem} />
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
