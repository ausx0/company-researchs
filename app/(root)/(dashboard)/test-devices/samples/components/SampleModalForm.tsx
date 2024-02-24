"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SampleSchema } from "../validation/SampleSchema";
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
import { apiPostSample } from "@/app/services/api/Samples";
import toast from "react-hot-toast";

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
};

const SampleModalForm: React.FC<cellActionProps> = ({ onClose, isOpen }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SampleSchema>>({
    resolver: zodResolver(SampleSchema),
    defaultValues: {
      Sample: "",
      // Price: "",
    },
  });
  const queryClient = useQueryClient();

  const SampleMutation = useMutation({
    mutationKey: ["Sample"],
    mutationFn: apiPostSample,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["LabSamples"],
      }); // Invalidate the 'Samples' query
    },
    onSuccess: () => {
      toast.success("Sample added successfully");
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SampleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    SampleMutation.mutate(values);

    // 3. Clear the form after submission.
    form.reset();
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onClose();
    }
  }, [form.formState.isSubmitSuccessful, onClose]);

  return (
    <>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Sample
                  </ModalHeader>
                  <ModalBody>
                    <FormField
                      control={form.control}
                      name="Sample"
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

export default SampleModalForm;
