"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TestsData = {
  ID: number;
  OnePrice: string;
  Price: number;
  Sample: string;
  Tests: string;
  State: number;
};

export const columns: ColumnDef<TestsData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "OnePrice",
    header: "One Price",
  },
  {
    accessorKey: "Price",
    header: "Price",
  },
  {
    accessorKey: "Sample",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sample
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Test",
    header: "Test",
  },
  {
    accessorKey: "State",
    header: "State",
  },
];
