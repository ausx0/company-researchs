"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@nextui-org/react";
import InputField from "../../../components/FormFields/InputField";
import { Calendar, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SelectField from "../../../components/FormFields/SelectField";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { apiGetItems } from "@/app/services/api/Inventory/Items";
import { PurchaseDetailsSchema } from "../validation/PurchaseInfo";
import { apiItemUnitsGetByItemID } from "@/app/services/api/Purchases/Add";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { formatPrice } from "@/lib/utils";

type PurchaseItemType = {
  data?: any;
};

const PurchaseItem: React.FC<PurchaseItemType> = ({ data }) => {
  const { data: items, isLoading: isItemsLoading } = useQuery({
    queryKey: ["Items"],
    queryFn: apiGetItems,
  });

  const {
    control,
    watch,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof PurchaseDetailsSchema>>({
    resolver: zodResolver(PurchaseDetailsSchema),
    defaultValues: {
      Item_id: undefined,
    },
  });

  const [addedItems, setAddedItems] = useState<any[]>([]);

  const selectedItemID = watch("Item_id");

  const { data: unitData, isLoading: isUnitsLoading } = useQuery({
    queryKey: ["ItemUnits", selectedItemID],
    queryFn: () => apiItemUnitsGetByItemID(selectedItemID),
    enabled: !!selectedItemID,
  });

  const columns: any = [
    {
      accessorKey: "Item_id",
      header: "Item",
      cell: ({ row }: any) => row.original.Item_label,
    },
    {
      accessorKey: "Quantity",
      header: "Unit",
      cell: ({ row }: any) => row.original.Unit_label, // Display the unit label
    },
    {
      accessorKey: "Amount",
      header: "Amount",
    },
    {
      accessorKey: "Cost",
      header: "Cost",
    },
    {
      accessorKey: "TotalCost",
      header: "Total Cost",
      cell: ({ row }: any) =>
        formatPrice(row.original.Amount * row.original.Cost), // Calculate total cost dynamically
    },
    {
      accessorKey: "Date",
      header: "Expiry date",
    },
    {
      accessorKey: "lotNo",
      header: "Lot No.",
    },
  ];

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Errors:", errors);
    }
  }, [errors]);

  const handleAddItem = () => {
    const formValues = getValues();

    const selectedItem = items.find(
      (item: any) => item.ID === formValues.Item_id
    );

    const selectedUnit = unitData
      ? Object.entries(unitData)
          .filter(([key]) => key !== "Units")
          .map(([key, value], index) => ({
            value: index,
            label: value as string,
          }))
          .find((unit) => unit.value === formValues.Quantity)
      : null;

    const newItem = {
      ...formValues,
      Item_label: selectedItem ? selectedItem.Name : "",
      Unit_label: selectedUnit ? selectedUnit.label : "", // Store the unit label to display in the table
    };

    setAddedItems((prevItems) => [...prevItems, newItem]);
    reset(); // Reset the form after adding
  };

  const onSubmit = () => {
    console.log("List of Items:", addedItems); // Console log the list of items
  };

  return (
    <>
      <Card className="shadow-md p-6">
        <CardHeader>Purchase Item</CardHeader>
        <CardContent>
          <div className="flex flex-col shadow-md rounded-md p-6 flex-1 gap-14">
            <div className="flex items-end flex-1 gap-4">
              <div className="flex-1">
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
                          .filter(([key]) => key !== "Units")
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
                  name="lotNo"
                  type={"text"}
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
              <Button color="primary" onClick={handleAddItem}>
                <PlusCircle /> Add Item
              </Button>
            </div>
          </div>
          <div className="my-10 mx-20">
            <Separator />
          </div>
          <div className="my-10 p-8 shadow-md">
            <h1 className="uppercase my-4">Items</h1>
            {isItemsLoading ? (
              <Loading />
            ) : (
              <DataTable
                showPagination={false}
                showSearch={false}
                showColumns={false}
                searchKey="Item_label"
                columns={columns}
                data={addedItems}
              />
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button color="primary" type="button" onClick={onSubmit}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PurchaseItem;
