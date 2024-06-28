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
import { PatientsData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PatientModal from "./PatientModalForm";
import { useDisclosure } from "@nextui-org/react";
import PatientModalForm from "./PatientModalForm";
import { apiDeletePatient } from "@/app/services/api/Customers/Patients";

export interface cellActionProps {
  data: PatientsData;
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

  const DeletePatientMutation = useMutation({
    mutationKey: ["Delete-Patient"],
    mutationFn: apiDeletePatient,
    onSuccess: () => {
      toast.success("Patient Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["Lab-Patients"],
      }); // Invalidate the 'Patients' query
    },
  });
  const onDelete = async () => {
    // .log(`Patient_id = ${data.ID}`);
    DeletePatientMutation.mutate({ Patient_id: data.ID });
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

      <PatientModalForm isOpen={isOpen} onClose={onClose} />

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
