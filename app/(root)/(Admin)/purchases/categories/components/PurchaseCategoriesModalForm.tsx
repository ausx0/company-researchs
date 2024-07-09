/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import InputField from "../../../components/FormFields/InputField";
import { PurchaseCategoriesSchema } from "../validation/PurchaseCategoriesSchema";
import { apiSavePurchaseCategory } from "@/app/services/api/Purchases/Categories";

export type PurchasesCategories = {
  ID?: string | undefined;
  Category: string;
  Description: string;
  // include other properties of a PurchasesCategories here
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  PurchasesCategories?: PurchasesCategories | null; // Allow null as a possible value
};

const PurchasesCategoriesModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  PurchasesCategories,
}) => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PurchaseCategoriesSchema>>({
    resolver: zodResolver(PurchaseCategoriesSchema),
    defaultValues: PurchasesCategories
      ? {
          Category: PurchasesCategories.Category,
          Description: PurchasesCategories.Description,
        }
      : { Category: "", Description: "" },
  });
  const queryClient = useQueryClient();

  const PurchasesCategoriesMutation = useMutation({
    mutationKey: ["purchases-categories"],
    mutationFn: apiSavePurchaseCategory,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["purchases-categories"],
      }); // Invalidate the 'PurchasesCategories' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      form.reset();
      toast.success(
        PurchasesCategories
          ? "PurchasesCategories updated successfully"
          : "PurchasesCategories added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PurchaseCategoriesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // If we're updating an existing PurchasesCategories, include the id
    if (PurchasesCategories) {
      PurchasesCategoriesMutation.mutate({
        ...values,
        ID: PurchasesCategories.ID,
      });
    } else {
      // If we're creating a new PurchasesCategories, don't include the id
      PurchasesCategoriesMutation.mutate(values);
    }
    // 3. Clear the form after submission.
  }

  useEffect(() => {
    if (PurchasesCategories) {
      form.reset({
        Category: PurchasesCategories.Category,
        Description: PurchasesCategories.Description,
      });
    }
  }, [PurchasesCategories]);

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {PurchasesCategories
                      ? "Update PurchasesCategories"
                      : "Add PurchasesCategories"}
                  </ModalHeader>
                  <ModalBody className="gap-8">
                    <InputField
                      label="Category"
                      name="Category"
                      control={form.control}
                      placeholder="Category"
                      errors={form.formState.errors}
                      type="text"
                    />
                    <InputField
                      label="Description"
                      name="Description"
                      control={form.control}
                      placeholder="Description"
                      errors={form.formState.errors}
                      type="text"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button variant="shadow" type="submit" disabled={loading}>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>{PurchasesCategories ? "Update" : "Add"}</>
                      )}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default PurchasesCategoriesModalForm;
