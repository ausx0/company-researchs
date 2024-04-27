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
import { ItemSchema } from "../validation/ItemSchema";
import { apiSaveItem } from "@/app/services/api/Inventory/Items";
import Loading from "@/components/ui/loading";

export type Item = {
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
  Item?: Item | null; // Allow null as a possible value
};

const ItemModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  Item,
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
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      Name: Item?.Name || "",
      Barcode: Item?.Barcode || "",
      Unit: Item?.Unit || "",
      PartUnit: Item?.PartUnit || "",
      Units: Item?.Units || 1,
      Least: Item?.Least || 1,
      Company: Item?.Company || "",
      Supplier: Item?.Supplier || "",
    },
  });

  const ItemMutation = useMutation({
    mutationKey: ["Item"],
    mutationFn: apiSaveItem,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Items"],
      }); // Invalidate the 'Item' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      reset();
      toast.success(
        Item ? "Item updated successfully" : "Item added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  console.log("Item", Item?.ID);
  const onSubmit: SubmitHandler<Item> = (values) => {
    if (Item) {
      ItemMutation.mutate({ ...values, ID: Item.ID });
    } else {
      ItemMutation.mutate(values);
    }
  };

  useEffect(() => {
    // Reset form with the new Item when Item prop changes
    if (Item) {
      reset({
        Name: Item.Name,
        Barcode: Item.Barcode,
        Unit: Item.Unit,
        PartUnit: Item.PartUnit,
        Units: Item.Units,
        Least: Item.Least,
        Company: Item.Company,
        Supplier: Item.Supplier,
      });
    }
  }, [Item, reset]);

  return (
    <>
      <Modal backdrop="blur" size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {Item?.ID ? "Edit" : "Add"} Item
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
                    disabled={Item ? true : false}
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

export default ItemModalForm;
