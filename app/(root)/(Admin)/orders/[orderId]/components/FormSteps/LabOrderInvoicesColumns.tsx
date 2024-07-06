"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// Adjusted type to match the provided data structure
export type PaymentData = {
  ID: number;
  Amount: number;
  Date: string;
  Payer: string;
};

// Since the provided data does not include SubTest, Test, Unit, Cost, Price, RFrom, RTo, and Result fields,
// the columns definition has been updated to match the PaymentData type.
export const OrderInvoicesColumns: ColumnDef<PaymentData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Payer",
    header: "Payer",
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },

  // Removed the columns that do not exist in the provided data structure
  // Added an actions column for demonstration purposes
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div>
        <Button className="bg-danger hover:bg-red-900">Delete</Button>
      </div>
    ),
  },
];
