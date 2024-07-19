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
import { apiSaveExpenseCategory } from "@/app/services/api/Finance/Expenses/Categories";
import { ExpenseCategoriesSchema } from "../validation/PurchaseCategoriesSchema";

export type ExpensesCategories = {
  ID?: string | undefined;
  Category: string;
  Description: string;
  // include other properties of a ExpensesCategories here
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  ExpensesCategories?: ExpensesCategories | null; // Allow null as a possible value
};

const ExpensesCategoriesModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  ExpensesCategories,
}) => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ExpenseCategoriesSchema>>({
    resolver: zodResolver(ExpenseCategoriesSchema),
    defaultValues: ExpensesCategories
      ? {
          Category: ExpensesCategories.Category,
          Description: ExpensesCategories.Description,
        }
      : { Category: "", Description: "" },
  });
  const queryClient = useQueryClient();

  const ExpensesCategoriesMutation = useMutation({
    mutationKey: ["add-expense-category"],
    mutationFn: apiSaveExpenseCategory,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Expenses-categories"],
      }); // Invalidate the 'ExpensesCategories' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      form.reset();
      toast.success(
        ExpensesCategories
          ? "Expenses Categories updated successfully"
          : "Expenses Categories added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ExpenseCategoriesSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // If we're updating an existing ExpensesCategories, include the id
    if (ExpensesCategories) {
      ExpensesCategoriesMutation.mutate({
        ...values,
        ID: ExpensesCategories.ID,
      });
    } else {
      // If we're creating a new ExpensesCategories, don't include the id
      ExpensesCategoriesMutation.mutate(values);
    }
    // 3. Clear the form after submission.
  }

  useEffect(() => {
    if (ExpensesCategories) {
      form.reset({
        Category: ExpensesCategories.Category,
        Description: ExpensesCategories.Description,
      });
    }
  }, [ExpensesCategories]);

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {ExpensesCategories
                      ? "Update Expenses Categories"
                      : "Add Expenses Categories"}
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
                        <>{ExpensesCategories ? "Update" : "Add"}</>
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

export default ExpensesCategoriesModalForm;
