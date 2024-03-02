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
import { TestsData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteTest, apiGetTest } from "@/app/services/api/Tests";
import TestModal, { Test } from "./TestModalForm";
import { useDisclosure } from "@nextui-org/react";
import TestModalForm from "./TestModalForm";

export interface cellActionProps {
  data: TestsData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const handleEdit = async () => {
    const Test = await apiGetTest(data.ID); // Fetch the Test data
    setEditingTest(Test); // Set the Test being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteTestMutation = useMutation({
    mutationKey: ["DeleteTest"],
    mutationFn: apiDeleteTest,
    onSuccess: () => {
      toast.success("Test Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["LabTests"],
      }); // Invalidate the 'Tests' query
    },
  });
  const onDelete = async () => {
    console.log(`Test_id = ${data.ID}`);
    DeleteTestMutation.mutate({ Test_id: data.ID });
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
      <TestModalForm isOpen={isOpen} onClose={onClose} test={editingTest} />{" "}
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
