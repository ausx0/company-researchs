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
import { ExpensesData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExpenseModal from "./ExpenseModalForm";
import { useDisclosure } from "@nextui-org/react";
import ExpenseModalForm from "./ExpenseModalForm";
import { apiDeleteExpense } from "@/app/services/api/Finance/Expenses";

export interface cellActionProps {
  data: ExpensesData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    onOpen();
    // onEdit(data.ID);
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteExpenseMutation = useMutation({
    mutationKey: ["Delete-Expense"],
    mutationFn: apiDeleteExpense,
    onSuccess: () => {
      toast.success("Expense Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["Lab-Expenses"],
      }); // Invalidate the 'Expenses' query
    },
  });
  const onDelete = async () => {
    // .log(`Expense_id = ${data.ID}`);
    DeleteExpenseMutation.mutate({ Expense_id: data.ID });
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

      <ExpenseModalForm isOpen={isOpen} onClose={onClose} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions Menu</DropdownMenuLabel>

          <DropdownMenuItem>
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
