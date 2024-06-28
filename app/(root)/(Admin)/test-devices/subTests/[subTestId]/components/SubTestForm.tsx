"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FlaskRound } from "lucide-react";
import { SubTestSchema } from "../validation/SubTestSchema";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import SelectField from "@/app/(root)/(Admin)/components/FormFields/SelectField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetTests } from "@/app/services/api/Tests";
import InputField from "@/app/(root)/(Admin)/components/FormFields/InputField";
import { Button, Spinner } from "@nextui-org/react";
import { apiCreateSubTest } from "@/app/services/api/SubTests";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SubTestForm = () => {
  // 1. Define your form.
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["TestsValues"],
    queryFn: apiGetTests,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SubTestSchema>>({
    resolver: zodResolver(SubTestSchema),
    defaultValues: {
      Test_id: "",
      SubTest: "",
      Unit: "",
      Cost: undefined,
      Price: undefined,
      Reference: "",
      Result: undefined,
    },
  });

  const TestMutation = useMutation({
    mutationKey: ["AddSubTest"],
    mutationFn: apiCreateSubTest,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["LabTests"],
      });
    },
    onSuccess: () => {
      toast.success("Sub Test added successfully");
      router.push("/test-devices/subTests");
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SubTestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    TestMutation.mutate(values);
    // .log(values);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col flex-1 gap-12">
          <div className="w-full">
            <SelectField
              control={control}
              name="Test_id"
              label="Test"
              errors={errors}
              options={
                data
                  ? data.map((item: any) => ({
                      value: item.ID,
                      label: item.Test,
                    }))
                  : []
              }
              isLoading={isLoading}
            />
          </div>
          <div className="flex w-full gap-10 flex-wrap ">
            <div className="flex w-full gap-10">
              <InputField
                errors={errors}
                control={control}
                type="text"
                label="Sub Test Name"
                name="SubTest"
              />

              <InputField
                errors={errors}
                control={control}
                type="text"
                label="Cost"
                name="Cost"
              />
              <InputField
                errors={errors}
                control={control}
                type="text"
                label="Price"
                name="Price"
              />
            </div>
            <div className="flex w-full gap-10">
              <InputField
                errors={errors}
                control={control}
                type="text"
                label="Unit"
                name="Unit"
              />

              <InputField
                errors={errors}
                control={control}
                type="text"
                label="Reference"
                name="Reference"
              />

              <div className="flex flex-col">
                <SelectField
                  control={control}
                  label="Result"
                  name="Result"
                  errors={errors}
                  options={[
                    { value: "1", label: "Short Text" },
                    { value: "2", label: "Long Text" },
                    { value: "3", label: "Number" },
                  ]}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={TestMutation.isPending}
          >
            {TestMutation.isPending ? <Spinner /> : "Add"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SubTestForm;
