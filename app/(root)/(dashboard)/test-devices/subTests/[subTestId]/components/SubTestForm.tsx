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
import SelectField from "@/app/(root)/(dashboard)/components/FormFields/SelectField";
import { useQuery } from "@tanstack/react-query";
import { apiGetTests } from "@/app/services/api/Tests";

interface IFormInput {
  Test: string;
}

const SubTestForm = () => {
  // 1. Define your form.

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
      Test: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SubTestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col flex-1">
          <div className="w-full">
            <SelectField
              control={control}
              name="Test"
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
        </div>
      </form>
    </>
  );
};

export default SubTestForm;
