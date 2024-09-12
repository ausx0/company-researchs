"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button, useDisclosure } from "@nextui-org/react";
import InputField from "../../../components/FormFields/InputField";
import { Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetSuppliers } from "@/app/services/api/Customers/Suppliers";
import SelectField from "../../../components/FormFields/SelectField";
import SuppliersModalForm from "../../../customers/suppliers/components/SupplierModalForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CreatePurchaseSchema } from "../validation/PurchaseInfo";
import toast from "react-hot-toast";
import { apiGetPurchaseCategories } from "@/app/services/api/Purchases/Categories";
import {
  apiCreatePurchase,
  apiUpdatePurchaseById,
} from "@/app/services/api/Purchases/Add";

// Utility function to format today's date
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

type PurchaseInfoType = {
  data: any;
  isEditMode?: boolean;
};

const PurchaseInfo: React.FC<PurchaseInfoType> = ({
  data,
  isEditMode = false,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { data: suppliers, isLoading: isSuppliersLoading } = useQuery({
    queryKey: ["Lab-Suppliers"],
    queryFn: apiGetSuppliers,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["purchases-categories"],
    queryFn: apiGetPurchaseCategories,
  });

  console.log("Editing Data: ", data);

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      if (isEditMode && data?.ID) {
        // Ensure the ID is passed correctly for updates
        return apiUpdatePurchaseById(data.ID, formData);
      } else if (!isEditMode) {
        return apiCreatePurchase(formData);
      } else {
        throw new Error("Purchase ID is missing for update operation.");
      }
    },
    mutationKey: [isEditMode ? "update-purchase" : "create-purchase"],
    onSuccess: (responseData) => {
      toast.success(isEditMode ? "Purchase Updated" : "Purchase Created");
      if (responseData?.Purchase_id) {
        router.push(`/purchases/${responseData.Purchase_id}`);
      }
    },
    onError: (error) => {
      toast.error(
        isEditMode ? "Error updating purchase" : "Error creating purchase"
      );
      console.error("Mutation Error:", error);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof CreatePurchaseSchema>>({
    resolver: zodResolver(CreatePurchaseSchema),
    defaultValues: {
      Invoice_number: data?.Invoice_id || "",
      Supplier_id: data?.Supplier || undefined,
      Category_id: data?.Category || undefined,
      Note: data?.Note || "",
      Date: data?.TimeStamp
        ? new Date(data.TimeStamp).toISOString().split("T")[0]
        : getTodayDate(),
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);

  const onSubmit = (formData: z.infer<typeof CreatePurchaseSchema>) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <SuppliersModalForm isOpen={isOpen} onClose={onClose} />
      <Card className="p-8 bg-white min-h-[80vh] shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <Card className="shadow-md">
              <CardHeader className="bg-gray-200">Purchase Info</CardHeader>
              <CardContent>
                <div className="flex flex-col my-8 gap-4">
                  <div className="flex flex-wrap gap-10 items-end">
                    <InputField
                      control={control}
                      errors={errors}
                      label="Invoice Number"
                      name="Invoice_number"
                      type="text"
                    />

                    <div className="w-full">
                      <div className="flex items-center py-2">
                        <span>Supplier</span>
                      </div>
                      <SelectField
                        control={control}
                        name="Supplier_id"
                        errors={errors}
                        isLoading={isSuppliersLoading}
                        options={
                          suppliers
                            ? suppliers.map((item: any) => ({
                                value: item.ID,
                                label: item.Name,
                              }))
                            : []
                        }
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex items-center py-2">
                        <span>Category</span>
                      </div>
                      <SelectField
                        control={control}
                        name="Category_id"
                        errors={errors}
                        isLoading={isCategoriesLoading}
                        options={
                          categories
                            ? categories.map((item: any) => ({
                                value: item.ID,
                                label: item.Category,
                              }))
                            : []
                        }
                      />
                    </div>

                    <InputField
                      control={control}
                      errors={errors}
                      label="Date"
                      name="Date"
                      type="date"
                      icon={<Calendar />}
                    />
                  </div>

                  <InputField
                    control={control}
                    errors={errors}
                    label="Notes"
                    name="Note"
                    type="text"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  color="primary"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Purchase"
                    : "Create Purchase"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Card>
    </>
  );
};

export default PurchaseInfo;
