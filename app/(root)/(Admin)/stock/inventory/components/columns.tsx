"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { CellAction } from "./cell-actions";
import { Button } from "@nextui-org/react";
import { formatPrice } from "@/lib/utils";
import { format, isValid, parse } from "date-fns";
// import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InventoryData = {
  ID: number;
  Barcode: string;
  Cost: number;
  Entry_date: string;
  Expire_date: string;
  In_use: number;
  Item: string;
  Lot_number: string;
  Quantity: number;
};

export const columns: ColumnDef<InventoryData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
    size: 5,
  },
  {
    accessorKey: "Barcode",
    header: "Barcode",
  },
  {
    accessorKey: "Item",
    header: "Name",
  },
  {
    accessorKey: "Lot_number",
    header: "Lot Number",
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
    size: 5,
  },
  {
    accessorKey: "Cost",
    header: "Cost",
    cell: ({ row }) => <>{formatPrice(row.getValue("Cost"))}</>, // Render the formatted price

    size: 5,
  },
  {
    accessorKey: "Entry_date",
    header: "Entry Date",
  },
  {
    accessorKey: "Expire_date",
    header: "Expire Date",
    cell: ({ row }) => {
      const expireDate = parse(
        row.getValue("Expire_date"),
        "dd/MM/yyyy",
        new Date()
      );
      const formattedDate = isValid(expireDate)
        ? format(expireDate, "dd/MM/yyyy")
        : "";
      const isExpired = expireDate <= new Date();
      return (
        <span className={isExpired ? "text-danger" : ""}>{formattedDate}</span>
      );
    },
  },
  {
    accessorKey: "In_use",
    header: "In Use",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // console.log(value);
      return row.original.In_use === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div>
          <Button color="primary">sh</Button>
        </div>
      );
    },
  },
];
