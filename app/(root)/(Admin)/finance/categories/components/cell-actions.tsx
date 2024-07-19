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
import ExpenseCategoryModalForm from "./ExpenseCategoriesModalForm";

import { ExpenseCategoriesData } from "./columns";
import {
  apiDeleteExpenseCategory,
  apiGetExpenseCategory,
} from "@/app/services/api/Finance/Expenses/Categories";

export interface cellActionProps {
  data: ExpenseCategoriesData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingExpenseCategory, setEditingExpenseCategory] =
    useState<ExpenseCategoriesData | null>(null);

  const handleEdit = async () => {
    if (!data.ID) {
      toast.error("Invalid ID");
      return;
    }
    const ExpenseCategory = await apiGetExpenseCategory(data.ID); // Fetch the ExpenseCategory data
    setEditingExpenseCategory(ExpenseCategory); // Set the ExpenseCategory being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteExpenseCategoryMutation = useMutation<
    any,
    any,
    { Category_id: string }
  >({
    mutationKey: ["DeleteExpenseCategory"],
    mutationFn: apiDeleteExpenseCategory,
    onSuccess: () => {
      toast.success("ExpenseCategory Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["Expenses-categories"],
      }); // Invalidate the 'ExpenseCategorys' query
    },
  });
  const onDelete = async () => {
    // .log(`ExpenseCategory_id = ${data.ID}`);
    DeleteExpenseCategoryMutation.mutate({ Category_id: data.ID });
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
      <ExpenseCategoryModalForm
        isOpen={isOpen}
        onClose={onClose}
        ExpensesCategories={editingExpenseCategory} // Corrected prop name
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
