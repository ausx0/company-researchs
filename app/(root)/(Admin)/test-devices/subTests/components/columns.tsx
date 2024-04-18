"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubTestsData = {
  ID: number;
  SubTest: string;
  Test: string;
  Unit: string;
  Cost: number;
  Price: number;
  RFrom: number;
  RTo: number;
  Result: "1" | "2" | "3"; // Change this line
};

const resultOptions = {
  "1": "Number",
  "2": "Short Text",
  "3": "Long Text",
};

export const columns: ColumnDef<SubTestsData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "SubTest",
    header: "Sub Test",
  },
  {
    accessorKey: "Test",
    header: "Test",
  },
  {
    accessorKey: "Unit",
    header: "Unit",
  },
  {
    accessorKey: "Cost",
    header: "Cost",
  },
  {
    accessorKey: "Price",
    header: "Price",
  },
  {
    accessorKey: "Reference",
    header: "Reference",
  },

  {
    accessorKey: "Result",
    header: "Result",
    cell: (cell) => resultOptions[cell.row.original.Result] || "Unknown", // Use cell.row.original.Result to get the cell value
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
