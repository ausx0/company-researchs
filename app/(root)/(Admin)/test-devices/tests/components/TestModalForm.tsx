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
import { apiPostTest, apiSaveTest } from "@/app/services/api/Tests";
import toast from "react-hot-toast";
import SelectField from "../../../components/FormFields/SelectField";

export type Test = {
  ID?: string | undefined;
  Test: string;
  Sample_id: { label: string; value: string };
  OnePrice: boolean;
  Price: string;
  OnePage: boolean;
  Text: boolean;
};

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
  test?: Test | null; // Allow null as a possible value
};

const TestModalForm: React.FC<cellActionProps> = ({
  onClose,
  isOpen,
  test,
}) => {
  const [loading, setLoading] = useState(false);

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
      Test: test?.Test || "",
      Sample_id: test?.Sample_id || { label: "", value: "" },
      OnePrice: test?.OnePrice || false,
      Price: test?.Price || "",
      OnePage: test?.OnePage || false,
      Text: test?.Text || false,
    },
  });

  const TestMutation = useMutation({
    mutationKey: ["add-test"],
    mutationFn: apiSaveTest,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["lab-tests"],
      }); // Invalidate the 'Test' query
    },
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      onClose();
      reset();
      toast.success(
        test ? "Test updated successfully" : "Test added successfully"
      );
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.message);
    },
  });

  console.log("Test", test?.ID);
  const onSubmit: SubmitHandler<Test> = (values) => {
    if (test) {
      TestMutation.mutate({ ...values, ID: test.ID });
    } else {
      TestMutation.mutate(values);
    }
  };

  useEffect(() => {
    // Reset form with the new test when test prop changes
    if (test) {
      reset({
        Test: test.Test,
        Sample_id: test.Sample_id,
        OnePrice: test.OnePrice,
        Price: test.Price,
        OnePage: test.OnePage,
        Text: test.Text,
      });
    }
  }, [test, reset]);

  return (
    <>
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
                  <SelectField
                    options={SampleValues}
                    control={control}
                    name="Sample_id"
                    label={"Sample"}
                    errors={errors}
                  />
                </div>

                <div className="flex  gap-4">
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

                  <Controller
                    control={control}
                    name="OnePage"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value} // set checked status
                        onChange={(e) => field.onChange(e.target.checked)} // update field value on change
                      >
                        One Page
                      </Checkbox>
                    )}
                  />

                  <Controller
                    control={control}
                    name="Text"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value} // set checked status
                        onChange={(e) => field.onChange(e.target.checked)} // update field value on change
                      >
                        Text
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

export default TestModalForm;
