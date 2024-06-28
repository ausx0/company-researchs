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
import { InventoryData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@nextui-org/react";
import {
  apiDeleteInventory,
  apiGetInventory,
} from "@/app/services/api/Inventory";
import InventoryModalForm, { Inventory } from "./InventoryModalForm";

export interface cellActionProps {
  data: InventoryData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingInventory, setEditingInventory] = useState<Inventory | null>(
    null
  );

  const handleEdit = async () => {
    const Inventory = await apiGetInventory(data.ID); // Fetch the Inventory data
    // .log(data.ID);
    setEditingInventory(Inventory); // Set the Inventory being edited
    onOpen();
  };

  const onCopy = (id: any) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteInventoryMutation = useMutation({
    mutationKey: ["DeleteInventory"],
    mutationFn: apiDeleteInventory,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Inventory Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["Inventory"],
      }); // Invalidate the 'Inventory' query
      setOpen(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  const onDelete = async () => {
    // .log(`Inventory_id = ${data.ID}`);
    DeleteInventoryMutation.mutate({ Inventory_id: data.ID });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <InventoryModalForm
        isOpen={isOpen}
        onClose={onClose}
        Inventory={editingInventory}
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
