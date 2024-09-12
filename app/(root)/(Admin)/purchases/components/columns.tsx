"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-actions";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

// This type is used to define the shape of our data.
export type PurchasesData = {
  ID: string;
  Invoice_id: string;
  Supplier: string;
  Note: string;
  Discount: number;
  Total: number;
  Payment_state: number;
  Category: string;
  PaidBy: string;
  User_id: string;
  TimeStamp: string;
};

export const columns: ColumnDef<PurchasesData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Invoice_id",
    header: "Invoice ID",
  },
  {
    accessorKey: "Supplier",
    header: "Supplier",
  },
  {
    accessorKey: "Note",
    header: "Note",
  },
  {
    accessorKey: "Discount",
    header: "Discount",
    cell: ({ row }) => <>{formatPrice(row.getValue("Discount"))}</>, // Render the formatted price
  },
  {
    accessorKey: "Total",
    header: "Total",
    cell: ({ row }) => <>{formatPrice(row.getValue("Total"))}</>, // Render the formatted price
  },
  {
    accessorKey: "Payment_state",
    header: "Payment Status",
    cell: ({ row }) => {
      const state = row.getValue("Payment_state");
      return <StateBadge state={state} />;
    },
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "PaidBy",
    header: "Paid By",
  },
  {
    accessorKey: "TimeStamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TimeStamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

const StateBadge = ({ state }: any) => {
  const stateText = state === 1 ? "Completed" : "Pending";
  const stateColor = state === 1 ? "bg-cyan-500" : "bg-yellow-500";

  return <Badge text={stateText} color={stateColor} />;
};
