"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button, Input } from "@nextui-org/react";
import { MailIcon, Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiCheckResult } from "@/app/services/api/Results/SubmitResult";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddResult = () => {
  const router = useRouter();

  const {
    reset,
    watch,
    formState: { errors },
    getValues,
    handleSubmit,
    control,
  } = useForm();

  const values = getValues();

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["check-result"],
    mutationFn: apiCheckResult,
    onError: () => {
      toast.dismiss();

      toast.error("Sample Not Found");
    },
    onMutate: () => {
      // No need to show loading toast here
      return toast.loading("Loading");
    },
    onSuccess: () => {
      // Dismiss the loading toast when the mutation succeeds
      toast.dismiss();
      toast.success("Sample Found");
      router.push(`/result/${values.Sample_id}`);
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    mutate(values);
  };

  return (
    <>
      <Card className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] my-20">
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">submit result</h1>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4  ">
            <Label className="flex items-center gap-2 text-xl bold">
              <Search /> Sample
            </Label>
            <InputField
              className="m-4 text-2xl"
              control={control}
              errors={errors}
              name="Sample_id"
              type="number"
              startContent={
                <div className="text-sm text-default-400 pointer-events-none flex-shrink-0">
                  #SM
                </div>
              }
            />
            <div className="flex justify-end">
              <Button
                color="primary"
                type="submit"
                className="m-4 self-end px-16"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddResult;
