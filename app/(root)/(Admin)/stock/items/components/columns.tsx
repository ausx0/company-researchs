"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-actions";
// import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ItemsData = {
  ID: string;
  Description: string;
  Amount: number;
  PaidBy: string;
  Date: string;
};

export const columns: ColumnDef<ItemsData>[] = [
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
    accessorKey: "Name",
    header: "Name",
  },
  {
    accessorKey: "Unit",
    header: "Unit",
  },
  {
    accessorKey: "PartUnit",
    header: "Part Unit",
  },
  {
    accessorKey: "Units",
    header: "Units",
    size: 5,
  },
  {
    accessorKey: "Least",
    header: "Least",
    size: 5,
  },
  {
    accessorKey: "Company",
    header: "Company",
  },
  {
    accessorKey: "Supplier",
    header: "Supplier",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
