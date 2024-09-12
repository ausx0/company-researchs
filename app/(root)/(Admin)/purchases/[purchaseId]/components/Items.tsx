"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, useDisclosure } from "@nextui-org/react";
import InputField from "../../../components/FormFields/InputField";
import { Calendar, Plus, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiGetSuppliers } from "@/app/services/api/Customers/Suppliers";
import SelectField from "../../../components/FormFields/SelectField";
import { SuppliersData } from "../../../customers/suppliers/components/columns";
import { Label } from "@radix-ui/react-label";
import SuppliersModalForm from "../../../customers/suppliers/components/SupplierModalForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { apiGetItems } from "@/app/services/api/Inventory/Items";
import { PurchaseItemsSchema } from "../validation/Items";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { PurchaseDetailsSchema } from "../validation/PurchaseInfo";
import { apiItemUnitsGetByItemID } from "@/app/services/api/Purchases/Add";

type PurchaseItemType = {
  data?: any;
};

const PurchaseItem: React.FC<PurchaseItemType> = ({ data }) => {
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ["Items"], // Fix: Pass the queryKey as an array
    queryFn: apiGetItems,
  });

  const {
    control,
    watch,
    getValues,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof PurchaseDetailsSchema>>({
    resolver: zodResolver(PurchaseDetailsSchema),

    defaultValues: {
      Item_id: undefined,
    },
  });

  const selectedItemID = watch("Item_id");

  const { data: unitData, isLoading: isUnitsLoading } = useQuery({
    queryKey: ["ItemUnits", selectedItemID], // Dynamic query key based on selectedItemID
    queryFn: () => apiItemUnitsGetByItemID(selectedItemID), // Fetch units based on selectedItemID
    enabled: !!selectedItemID, // Only run this query if selectedItemID is truthy
  });

  const columns: any = [
    {
      accessorKey: "ID",
      header: "ID",
    },
    {
      accessorKey: "Test",
      header: "Test ID",
      //   cell: ({ row }) => row.original.Test.label,
    },
    {
      accessorKey: "SubTest",
      header: "SubTest IDs",
      //   cell: ({ row }) =>
      //     row.original.SubTest
      //       ? row.original.SubTest.map((subTest) => subTest.label).join(", ")
      //       : "",
    },
    {
      accessorKey: "Price",
      header: "Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      //   cell: ({ row }) => (
      //     <Button
      //       color="danger"
      //       size="sm"
      //       onClick={() => handleDelete(row.original.ID)} // Define a function to handle delete action
      //     >
      //       <Trash2 /> {/* Render the Trash icon */}
      //     </Button>
      //   ),
    },
  ];

  //   const {
  //     control,
  //     watch,
  //     getValues,
  //     reset,
  //     setValue,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<z.infer<typeof PurchaseItemsSchema>>({
  //     resolver: zodResolver(PurchaseItemsSchema),

  //     defaultValues: {
  //       //   Invoice_number: "",
  //       //   Supplier_Id: undefined,
  //       //   Category: "",
  //       //   Notes: "",
  //       //   Date: "",
  //     },
  //   });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);
  const onSubmit = (data: z.infer<typeof PurchaseItemsSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Card className="shadow-md p-6">
        <CardHeader>Purchase Item</CardHeader>
        <CardContent>
          <div className="flex flex-col shadow-md rounded-md p-6  flex-1 gap-14">
            <div className="flex items-end flex-1 gap-4">
              <div className="flex-1">
                {/* <InputField
                      control={control}
                      errors={errors}
                      label="Category"
                      name="Category"
                      type={"text"}
                    /> */}

                <SelectField
                  control={control}
                  label="Item"
                  name="Item_id"
                  errors={errors}
                  isLoading={isItemsLoading}
                  options={
                    items
                      ? items.map((item: any) => ({
                          value: item.ID,
                          label: item.Name,
                        }))
                      : []
                  }
                />
              </div>
              <div className="flex-1">
                <SelectField
                  control={control}
                  name="Quantity"
                  label="Unit"
                  errors={errors}
                  isLoading={isUnitsLoading}
                  options={
                    unitData
                      ? Object.entries(unitData)
                          .filter(([key]) => key !== "Units") // Exclude the "Units" field
                          .map(([key, value], index) => ({
                            value: index,
                            label: value as string,
                          }))
                      : []
                  }
                />
              </div>
              <div className="flex-1">
                <InputField
                  control={control}
                  errors={errors}
                  label="Amount"
                  name="Amount"
                  type={"number"}
                />
              </div>
              <div className="flex-1">
                <InputField
                  control={control}
                  errors={errors}
                  label="Cost"
                  name="Cost"
                  type={"number"}
                />
              </div>
            </div>
            <div className="flex gap-4 flex-1">
              <div className="flex-1">
                <InputField
                  control={control}
                  errors={errors}
                  label="lot No."
                  name="Date"
                  type={"number"}
                />
              </div>
              <div className="flex-1">
                <InputField
                  control={control}
                  errors={errors}
                  label="Expiry date"
                  name="Date"
                  type={"date"}
                  icon={<Calendar />}
                  startContent={<></>}
                />
              </div>
            </div>
            <div className="flex-1 flex justify-end items-center">
              <Button color="primary">
                <PlusCircle />{" "}
              </Button>
            </div>
          </div>
          <div className="my-10 mx-20">
            {" "}
            <Separator />
          </div>
          <div className="my-10 p-8 shadow-md">
            <h1>Items</h1>
            {isItemsLoading ? (
              <Loading />
            ) : (
              <DataTable
                showPagination={false}
                showSearch={false}
                showColumns={false}
                searchKey="Test"
                columns={columns}
                data={items}
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button color="primary" type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PurchaseItem;
