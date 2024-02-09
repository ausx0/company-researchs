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
} from "@nextui-org/react";
import Select from "react-select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { useRouter } from "next/navigation";
import { SampleSchema } from "../validation/TestsSchema";

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
import { apiGetSamples } from "@/app/services/api/Samples";
import { Input } from "@/components/ui/input";
import TextField from "@/app/components/FormFields/TextField";
import { apiPostTest } from "@/app/services/api/Tests";
import toast from "react-hot-toast";

interface IFormInput {
  Test: string;
  Sample_id: { label: string; value: string };
  OnePrice: boolean;
  Price: string;
}

const AddTestModal = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["SampleValues"],
    queryFn: apiGetSamples,
  });

  const SampleValues =
    data?.map((sample: any) => ({
      label: sample.Sample,
      value: sample.ID,
    })) || [];
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(SampleSchema),
    defaultValues: {
      Test: "",
      Sample_id: { label: "", value: "" }, // Provide default values for label and value
      OnePrice: false,
      Price: "",
    },
  });

  const TestMutation = useMutation({
    mutationKey: ["Test"],
    mutationFn: apiPostTest,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["LabTests"],
      });
    },
    onSuccess: () => {
      toast.success("Test added successfully");
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    TestMutation.mutate(data);
    reset();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isSubmitSuccessful) {
      onClose();
    }
  }, [isSubmitSuccessful, onClose]);
  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Add Test <Plus />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Add Test</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <ModalBody>
              <>
                <div className="flex flex-col gap-4">
                  <TextField
                    type={"text"}
                    label="Test"
                    control={control}
                    errors={errors}
                    name="Test"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="sample">Sample</label>
                  <Controller
                    control={control}
                    name="Sample_id"
                    render={({ field }) => (
                      <div>
                        <Select
                          options={SampleValues}
                          onChange={(option) => field.onChange(option.value)} // pass the selected option's value
                          onBlur={field.onBlur}
                          value={SampleValues.find(
                            (option: any) => option.value === field.value
                          )} // set the selected option
                        />
                      </div>
                    )}
                  />
                  {errors.Sample_id && <span>{errors.Sample_id.message}</span>}
                </div>

                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="OnePrice"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value} // set checked status
                        onChange={(e) => field.onChange(e.target.checked)} // update field value on change
                      >
                        One Price
                      </Checkbox>
                    )}
                  />

                  {errors.OnePrice && <span>{errors.OnePrice.message}</span>}
                </div>

                <div className="flex flex-col gap-4">
                  <TextField
                    label="Price"
                    type="number"
                    control={control}
                    errors={errors}
                    name="Price"
                  />
                  {/* {errors.Price && <span>{errors.Price.message}</span>} */}
                </div>
              </>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancle
              </Button>
              <Button variant="shadow" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTestModal;
