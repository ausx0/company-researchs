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
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFinishOrder } from "@/app/services/api/Orders/OrderForm";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import { apiGetOrder } from "@/app/services/api/Orders/AllOrders";
import Loading from "@/components/ui/loading";

const PaymentForm = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL
  const {
    data: orderData,
    isLoading: orderLoading,
    isFetching: orderFetching,
    error: orderError,
  } = useQuery<any>({
    queryKey: ["Lab-Orders"],
    queryFn: () => (id ? apiGetOrder(id) : Promise.resolve(null)),
  });

  console.log(orderData);

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
      Bofore_discount: orderData?.Bofore_discount || 0,
      Discount: orderData?.Discount || null,
      Total: orderData?.Total || 0,
      Payment_status: orderData?.Payment_status || "Unknown",
      Payment_method: "0", // Default payment method is Cash
      Transaction_id: "",
      Paid: orderData?.Paid || 0,
      Total_due: orderData?.Total_due,
      Subtotal: orderData?.Subtotal || 0,
      Client_id: orderData?.Client_id || 1,
      Client_name: orderData?.Client_name || "ahmed",
      Completed: orderData?.Completed || 0,
      Cost: orderData?.Cost || null,
      Date: orderData?.Date || "2024-07-07",
      Delivered: orderData?.Delivered || null,
      ID: orderData?.ID || 44,
      Notes: orderData?.Notes || "",
      Order_identifier: orderData?.Order_identifier || "#DX0044",
      Referred: orderData?.Referred || "asdasd",
      State: orderData?.State || 1,
      Type: orderData?.Type || 2,
    },
  });

  const FinishOrder = useMutation({
    mutationKey: ["FinishOrder"],
    mutationFn: apiFinishOrder,
    onSuccess: () => {
      toast.success("Payment updated successfully");
    },
  });

  const onSubmit = (data: z.infer<typeof OrderPaymentSchema>) => {
    const { Payment_status, ...dataWithoutPaymentStatus } = data;
    FinishOrder.mutate(dataWithoutPaymentStatus);
  };

  const paymentStatus = watch("Payment_status");
  const paymentMethod = watch("Payment_method");
  const total = watch("Total_due");
  const discount = watch("Discount");

  const subtotal = watch("Subtotal");

  useEffect(() => {
    if (paymentStatus === "paid") {
      setValue("Paid", total);
    } else if (paymentStatus === "not_paid") {
      setValue("Paid", "");
    }
    // No else case for "part_paid" as it requires manual input
  }, [paymentStatus, setValue, total]);

  useEffect(() => {
    setValue("Total_due", orderData?.Total_due || 0);
    setValue("Subtotal", orderData?.Subtotal || 0);
  }, [orderData, setValue]);

  useEffect(() => {
    setValue("Transaction_id", ""); // Reset Transaction_id when payment method changes
    if (paymentMethod === "Zain Cash" || paymentMethod === "Credit Card") {
      setValue("Transaction_id", ""); // Enable Transaction_id field for Zain Cash and Credit Card
    }
  }, [paymentMethod, setValue]);

  useEffect(() => {
    const discountAmount = (subtotal * discount) / 100;
    const totalDue = subtotal - discountAmount;
    setValue("Total_due", totalDue);
  }, [discount, subtotal, setValue]);

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

  if (orderLoading) return <Loading />;

  return (
    <>
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="text-lg">Total Due:</div>
            <div className="font-bold text-lg ">
              {formatPrice(watch("Total_due"))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-lg">Subtotal:</div>
            <div className="font-bold text-lg ">
              {formatPrice(watch("Subtotal"))}
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
            label="Discount (%)"
            type="number"
            errors={errors}
            onChange={(e) => setValue("Discount", Number(e.target.value))}
            min={0}
            max={100}
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
            startContent={"IQD"}
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
