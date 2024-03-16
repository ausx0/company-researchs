import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { OrderPaymentSchema } from "../../validation/orderSchema";
import { usePathname } from "next/navigation";
import { z } from "zod";
import InputField from "@/app/(root)/(dashboard)/components/FormFields/InputField";
import { Button } from "@nextui-org/react";
import { DollarSign } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiFinishOrder } from "@/app/services/api/Orders/OrderForm";

const PaymentForm = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OrderPaymentSchema),
    defaultValues: {
      Order_id: id ? Number(id) : undefined,
      Cost: undefined,
      Bofore_discount: undefined,
      Discount: undefined,
      Total: undefined,
      Payment_status: undefined,
      Paid: undefined,
    },
  });

  const FinishOrder = useMutation({
    mutationKey: ["FinishOrder"],
    mutationFn: apiFinishOrder,
  });

  const onSubmit = (data: z.infer<typeof OrderPaymentSchema>) => {
    console.log(data);
    FinishOrder.mutate(data);
  };

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  gap-6">
          <InputField
            control={control}
            name="Total"
            label="Total"
            type="number"
            errors={errors}
          />
          <InputField
            control={control}
            name="Cost"
            label="Cost"
            type="number"
            errors={errors}
          />
          <InputField
            control={control}
            name="Bofore_discount"
            label="Before Discount"
            type="number"
            errors={errors}
          />
          <InputField
            control={control}
            name="Discount"
            label="Discount"
            type="number"
            errors={errors}
          />

          <InputField
            control={control}
            name="Payment_status"
            label="Payment Status"
            type="text"
            errors={errors}
          />
          <InputField
            control={control}
            name="Paid"
            label="Paid"
            type="number"
            errors={errors}
          />
          <div className="flex items-center justify-between">
            <div></div>
            <div>
              <Button className="flex gap-3" type="submit">
                <DollarSign /> Finish
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
