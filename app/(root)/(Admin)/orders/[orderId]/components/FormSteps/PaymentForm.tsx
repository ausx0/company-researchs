import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { OrderPaymentSchema } from "../../validation/orderSchema";
import { usePathname } from "next/navigation";
import { z } from "zod";
import InputField from "@/app/(root)/(Admin)/components/FormFields/InputField";
import { Button } from "@nextui-org/react";
import { DollarSign } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiFinishOrder } from "@/app/services/api/Orders/OrderForm";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

type OrderDataProps = {
  orderData: any;
};

const PaymentForm: React.FC<OrderDataProps> = ({ orderData }) => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(OrderPaymentSchema),
    defaultValues: {
      Order_id: id ? Number(id) : undefined,
      Payer: "",
      Bofore_discount: orderData?.Bofore_discount,
      Discount: undefined,
      Total: orderData?.Total,
      Payment_status: undefined,
      Paid: undefined,
    },
  });

  const FinishOrder = useMutation({
    mutationKey: ["FinishOrder"],
    mutationFn: apiFinishOrder,
    onSuccess: () => {
      toast.success("payment update successfully");
    },
  });

  const onSubmit = (data: z.infer<typeof OrderPaymentSchema>) => {
    // .log(data);
    FinishOrder.mutate(data);
  };

  useEffect(() => {
    setValue("Total", orderData?.Total);
  }, [orderData, setValue]);

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  gap-6">
          <div className="flex justify-between items-center">
            <div className="text-lg">Total Price:</div>
            <div className="font-bold text-lg ">
              {formatPrice(watch("Total"))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-lg">Before Discount:</div>
            <div className="font-bold text-lg ">
              {formatPrice(watch("Bofore_discount"))}
            </div>
          </div>
          <InputField
            control={control}
            name="Payer"
            label="Payer"
            type="text"
            errors={errors}
          />
          {/* <InputField
            control={control}
            name="Bofore_discount"
            label="Before Discount"
            type="number"
            errors={errors}
          /> */}

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
              <Button className="flex gap-3" type="submit" color="primary">
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
