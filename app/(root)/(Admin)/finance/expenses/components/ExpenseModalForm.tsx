"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import {
  CalendarRange,
  DollarSign,
  MailIcon,
  MapIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  Plus,
  User,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ExpenseSchema } from "../validation/ExpenseSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiPostExpense } from "@/app/services/api/Finance/Expenses";
import InputField from "../../../components/FormFields/InputField";
import { PersonIcon } from "@radix-ui/react-icons";
import SelectField from "../../../components/FormFields/SelectField";
import { apiGetExpenseCategories } from "@/app/services/api/Finance/Expenses/Categories";

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
};

const ExpenseModalForm: React.FC<cellActionProps> = ({ onClose, isOpen }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      Amount: undefined,
      By: "",
      Category: undefined,
      Date: "",
      Description: "",
    },
  });

  const queryExpense = useQueryClient();

  const ExpenseMutation = useMutation({
    mutationKey: ["Post-Expense"],
    mutationFn: apiPostExpense,
    onSettled: async () => {
      await queryExpense.invalidateQueries({
        queryKey: ["Lab-Expenses"],
      }); // Invalidate the 'Expenses' query
    },
    onSuccess: () => {
      toast.success("Expense added successfully");
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // .log(values);
    ExpenseMutation.mutate(values);

    // 3. Clear the form after submission.
    form.reset();
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onClose();
    }
  }, [form.formState.isSubmitSuccessful, onClose]);

  const { data, isLoading, isSuccess, error, isError } = useQuery<any>({
    queryKey: ["expense-categories"],
    queryFn: apiGetExpenseCategories,
  });

  if (isError) {
    console.error("Error fetching expense categories:", error);
  }

  if (isSuccess) console.log({ data, isLoading });

  return (
    <>
      <Modal backdrop="blur" size="xl" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Expense
                  </ModalHeader>
                  <ModalBody className="m-4">
                    <div className="flex flex-col gap-6">
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <SelectField
                            isLoading={isLoading}
                            control={form.control}
                            name="Category"
                            label="Category"
                            errors={form.formState.errors}
                            options={
                              data
                                ? data.map((item: any) => ({
                                    value: item.ID,
                                    label: item.Category,
                                  }))
                                : []
                            }
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="Amount"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Amount"
                            type="number"
                            startContent={<div>IQD</div>}
                            icon={<DollarSign />}
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <InputField
                            name="By"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Paid By"
                            type="text"
                            icon={<User />}
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="Date"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Date"
                            type="date"
                            startContent={<div></div>}
                            icon={<CalendarRange />}
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <InputField
                            name="Description"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Description"
                            type="Text"
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button variant="shadow" type="submit">
                      Add
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

export default ExpenseModalForm;
