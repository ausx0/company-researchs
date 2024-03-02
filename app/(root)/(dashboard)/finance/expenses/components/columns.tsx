"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExpensesData = {
  ID: string;
  Description: string;
  Amount: number;
  PaidBy: string;
  Date: string;
};

export const columns: ColumnDef<ExpensesData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Amount",
    header: "Amount",
  },
  {
    accessorKey: "Gender",
    header: "Gender",
  },
  {
    accessorKey: "PaidBy",
    header: "Paid By",
  },
  {
    accessorKey: "Date",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
