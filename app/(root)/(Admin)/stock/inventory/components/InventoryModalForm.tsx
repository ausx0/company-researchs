"use client";
import React, { use, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import Select from "react-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import TextField from "@/app/components/FormFields/TextField";
import toast from "react-hot-toast";
import SelectField from "../../../components/FormFields/SelectField";
import Loading from "@/components/ui/loading";
import { InventorySchema } from "../validation/InventorySchema";
import { apiSaveInventory } from "@/app/services/api/Inventory";

export type Inventory = {
  ID?: string | undefined;
  Name: string;
  Barcode: string;
  Unit: string;
  PartUnit: string;
  Units: number;
  Least: number;
  Company: string;
  Supplier: string;
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  Inventory?: Inventory | null; // Allow null as a possible value
};

const InventoryModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  Inventory,
}) => {
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      Name: Inventory?.Name || "",
      Barcode: Inventory?.Barcode || "",
      Unit: Inventory?.Unit || "",
      PartUnit: Inventory?.PartUnit || "",
      Units: Inventory?.Units || 1,
      Least: Inventory?.Least || 1,
      Company: Inventory?.Company || "",
      Supplier: Inventory?.Supplier || "",
    },
  });

  const InventoryMutation = useMutation({
    mutationKey: ["Inventory"],
    mutationFn: apiSaveInventory,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Inventory"],
      }); // Invalidate the 'Inventory' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      reset();
      toast.success(
        Inventory
          ? "Inventory updated successfully"
          : "Inventory added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  console.log("Inventory", Inventory?.ID);
  const onSubmit: SubmitHandler<Inventory> = (values) => {
    if (Inventory) {
      InventoryMutation.mutate({ ...values, ID: Inventory.ID });
    } else {
      InventoryMutation.mutate(values);
    }
  };

  useEffect(() => {
    // Reset form with the new Inventory when Inventory prop changes
    if (Inventory) {
      reset({
        Name: Inventory.Name,
        Barcode: Inventory.Barcode,
        Unit: Inventory.Unit,
        PartUnit: Inventory.PartUnit,
        Units: Inventory.Units,
        Least: Inventory.Least,
        Company: Inventory.Company,
        Supplier: Inventory.Supplier,
      });
    }
  }, [Inventory, reset]);

  return (
    <>
      <Modal backdrop="blur" size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {Inventory?.ID ? "Edit" : "Add"} Inventory
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <ModalBody>
              <div className="flex flex-col gap-8">
                <div className="flex gap-4 w-full">
                  <TextField
                    type={"text"}
                    label="Name"
                    control={control}
                    errors={errors}
                    name="Name"
                  />
                  <TextField
                    type={"text"}
                    label="Barcode"
                    control={control}
                    errors={errors}
                    name="Barcode"
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <TextField
                    type={"text"}
                    label="Unit"
                    control={control}
                    errors={errors}
                    name="Unit"
                  />
                  <TextField
                    type={"text"}
                    label="PartUnit"
                    control={control}
                    errors={errors}
                    name="PartUnit"
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <TextField
                    type={"number"}
                    label="Units"
                    control={control}
                    errors={errors}
                    name="Units"
                    disabled={Inventory ? true : false}
                  />

                  <TextField
                    type={"number"}
                    label="Least"
                    control={control}
                    errors={errors}
                    name="Least"
                  />
                </div>
                <div className="flex gap-4 w-full">
                  <TextField
                    type={"text"}
                    label="Company"
                    control={control}
                    errors={errors}
                    name="Company"
                  />
                  <TextField
                    type={"text"}
                    label="Supplier"
                    control={control}
                    errors={errors}
                    name="Supplier"
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button variant="shadow" type="submit">
                {loading ? <Spinner /> : "Save"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InventoryModalForm;
