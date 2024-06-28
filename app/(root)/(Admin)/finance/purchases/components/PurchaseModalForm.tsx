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
import { PurchaseSchema } from "../validation/PurchaseSchema";
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
import {
  apiPostPurchase,
  apiPutPurchase,
  apiSavePurchase,
} from "@/app/services/api/Finance/Purchases";
import toast from "react-hot-toast";

export type Purchase = {
  ID?: string | undefined;
  Purchase: string;
  // include other properties of a Purchase here
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  Purchase?: Purchase | null; // Allow null as a possible value
};

const PurchaseModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  Purchase,
}) => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: Purchase
      ? { Purchase: Purchase.Purchase }
      : { Purchase: "" },
  });
  const queryClient = useQueryClient();

  const PurchaseMutation = useMutation({
    mutationKey: ["Purchase"],
    mutationFn: apiSavePurchase,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["LabPurchases"],
      }); // Invalidate the 'Purchases' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      form.reset();
      toast.success(
        Purchase
          ? "Purchase updated successfully"
          : "Purchase added successfully"
      );
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PurchaseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // If we're updating an existing Purchase, include the id
    if (Purchase) {
      PurchaseMutation.mutate({ ...values, ID: Purchase.ID });
    } else {
      // If we're creating a new Purchase, don't include the id
      PurchaseMutation.mutate(values);
    }
    // 3. Clear the form after submission.
  }

  // useEffect(() => {
  //   if (form.formState.isSubmitSuccessful) {
  //     onClose();
  //   }
  // }, [form.formState.isSubmitSuccessful, onClose]);

  useEffect(() => {
    // Reset form with the new Purchase when Purchase prop changes
    // .log("Purchase", Purchase);
    form.reset({
      Purchase: Purchase ? Purchase.Purchase : "",
    });
  }, [Purchase]);

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Purchase
                  </ModalHeader>
                  <ModalBody>
                    <FormField
                      control={form.control}
                      name="Purchase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              variant="underlined"
                              placeholder="Ali"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancle
                    </Button>
                    <Button variant="shadow" type="submit" disabled={loading}>
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>{Purchase ? "Update" : "Add"}</>
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

export default PurchaseModalForm;
