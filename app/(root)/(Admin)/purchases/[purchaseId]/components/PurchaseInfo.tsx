"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PurchaseInfoSchema } from "../validation/PurchaseInfo";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@nextui-org/react";
import InputField from "../../../components/FormFields/InputField";

type PurchaseInfoType = {
  data: any;
};

const PurchaseInfo: React.FC<PurchaseInfoType> = ({ data }) => {
  const {
    control,
    watch,
    getValues,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PurchaseInfoSchema>>({
    resolver: zodResolver(PurchaseInfoSchema),
    defaultValues: {
      Invoice_number: "",
      Supplier_Id: "",
      Category: "",
      Notes: "",
      Date: "",
    },
  });

  const onSubmit = (data: z.infer<typeof PurchaseInfoSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <Card>
        <CardHeader>Purchase Info</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  label="Invoice Number"
                  name="Invoice_number"
                  type={"number"}
                />
                <InputField
                  control={control}
                  errors={errors}
                  label="Supplier"
                  name="Supplier_Id"
                  type={"text"}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  label="Category"
                  name="Category"
                  type={"text"}
                />
                <InputField
                  control={control}
                  errors={errors}
                  label="Notes"
                  name="Notes"
                  type={"text"}
                />
              </div>
              <div>
                <InputField
                  control={control}
                  errors={errors}
                  label="Date"
                  name="Date"
                  type={"number"}
                />
              </div>
            </div>
            <CardFooter>
              <Button color="primary">Save</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseInfo;
