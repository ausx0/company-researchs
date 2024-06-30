import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { OrderPaymentSchema } from "../../validation/orderSchema";
import { usePathname } from "next/navigation";
import { z } from "zod";
import InputField from "@/app/(root)/(Admin)/components/FormFields/InputField";
import SelectField from "@/app/(root)/(Admin)/components/FormFields/SelectField";
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
      Bofore_discount: 0 || orderData?.Bofore_discount,
      Discount: undefined,
      Total: orderData?.Total,
      Payment_status: undefined,
      Payment_method: "Cash", // Default payment method is Cash
      Transaction_id: "",
      Paid: "",
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
    const { Payment_status, ...dataWithoutPaymentStatus } = data;
    FinishOrder.mutate(dataWithoutPaymentStatus);
  };

  const paymentStatus = watch("Payment_status");
  const paymentMethod = watch("Payment_method");
  const total = watch("Total");

  useEffect(() => {
    if (paymentStatus === "paid") {
      setValue("Paid", total);
    } else if (paymentStatus === "not_paid") {
      setValue("Paid", "");
    }
    // No else case for "part_paid" as it requires manual input
  }, [paymentStatus, setValue, total]);

  useEffect(() => {
    setValue("Total", orderData?.Total);
  }, [orderData, setValue]);

  useEffect(() => {
    setValue("Transaction_id", ""); // Reset Transaction_id when payment method changes
    if (paymentMethod === "Zain Cash" || paymentMethod === "Credit Card") {
      setValue("Transaction_id", ""); // Enable Transaction_id field for Zain Cash and Credit Card
    }
  }, [paymentMethod, setValue]);

  function PaymentStatusOptions(): { value: string; label: string }[] {
    return [
      { value: "not_paid", label: "Not Paid" },
      { value: "paid", label: "Paid" },
      { value: "part_paid", label: "Part Paid" },
    ];
  }

  function PaymentMethodOptions(): { value: string; label: string }[] {
    return [
      { value: "0", label: "Cash" },
      { value: "1", label: "Zain Cash" },
      { value: "2", label: "Credit Card" },
    ];
  }

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col  gap-6">
          <div className="flex justify-between items-center">
            <div className="text-lg">Total Due:</div>
            <div className="font-bold text-lg ">
              {formatPrice(watch("Total"))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-lg">Subtotal:</div>
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
          <InputField
            control={control}
            name="Discount"
            label="Discount"
            type="number"
            errors={errors}
          />

          <div className="my-1">
            <SelectField
              errors={errors}
              label="Payment Method"
              control={control}
              name="Payment_method"
              options={PaymentMethodOptions()}
            />
          </div>
          <InputField
            control={control}
            name="Transaction_id"
            label="Transaction ID"
            type="text"
            errors={errors}
            disabled={paymentMethod === "0"} // Disable for Cash
          />
          <div className="my-1">
            <SelectField
              errors={errors}
              label="Payment Status"
              control={control}
              name="Payment_status"
              options={PaymentStatusOptions()}
            />
          </div>
          <InputField
            control={control}
            name="Paid"
            label="Paid"
            type="number"
            errors={errors}
            disabled={paymentStatus !== "part_paid"}
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
