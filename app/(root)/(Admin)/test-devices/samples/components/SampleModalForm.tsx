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
import {
  apiPostSample,
  apiPutSample,
  apiSaveSample,
} from "@/app/services/api/Samples";
import toast from "react-hot-toast";

export type Sample = {
  ID?: string | undefined;
  Sample: string;
  // include other properties of a sample here
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  sample?: Sample | null; // Allow null as a possible value
};

const SampleModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  sample,
}) => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof SampleSchema>>({
    resolver: zodResolver(SampleSchema),
    defaultValues: sample ? { Sample: sample.Sample } : { Sample: "" },
  });
  const queryClient = useQueryClient();

  const SampleMutation = useMutation({
    mutationKey: ["Sample"],
    mutationFn: apiSaveSample,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["LabSamples"],
      }); // Invalidate the 'Samples' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      form.reset();
      toast.success(
        sample ? "Sample updated successfully" : "Sample added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SampleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // If we're updating an existing sample, include the id
    if (sample) {
      SampleMutation.mutate({ ...values, ID: sample.ID });
    } else {
      // If we're creating a new sample, don't include the id
      SampleMutation.mutate(values);
    }
    // 3. Clear the form after submission.
  }

  // useEffect(() => {
  //   if (form.formState.isSubmitSuccessful) {
  //     onClose();
  //   }
  // }, [form.formState.isSubmitSuccessful, onClose]);

  useEffect(() => {
    if (sample) {
      // .log("Sample", sample);
      form.reset({
        Sample: sample.Sample,
      });
    }
  }, [sample]);
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
                    <Button variant="shadow" type="submit" disabled={loading}>
                      {loading ? <Spinner /> : <>{sample ? "Update" : "Add"}</>}
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
