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
import { SamplesData } from "./columns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteSample, apiGetSample } from "@/app/services/api/Samples";
import SampleModal, { Sample } from "./SampleModalForm";
import { useDisclosure } from "@nextui-org/react";
import SampleModalForm from "./SampleModalForm";

export interface cellActionProps {
  data: SamplesData;
}

export const CellAction: React.FC<cellActionProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingSample, setEditingSample] = useState<Sample | null>(null);

  const handleEdit = async () => {
    const sample = await apiGetSample(data.ID); // Fetch the sample data
    setEditingSample(sample); // Set the sample being edited
    onOpen();
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID Copied!");
  };
  const queryClient = useQueryClient();

  const DeleteSampleMutation = useMutation({
    mutationKey: ["DeleteSample"],
    mutationFn: apiDeleteSample,
    onSuccess: () => {
      toast.success("Sample Delete successfully");
      queryClient.invalidateQueries({
        queryKey: ["LabSamples"],
      }); // Invalidate the 'Samples' query
    },
  });
  const onDelete = async () => {
    // .log(`Sample_id = ${data.ID}`);
    DeleteSampleMutation.mutate({ Sample_id: data.ID });
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
      <SampleModalForm
        isOpen={isOpen}
        onClose={onClose}
        sample={editingSample}
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
