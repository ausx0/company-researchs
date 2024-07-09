"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TestsData = {
  ID: string;
  OnePrice: number;
  OnePage: number;
  Text: number;
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
    accessorKey: "Test",
    header: "Test",
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
    accessorKey: "OnePage",
    header: "One Page",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.OnePage === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    accessorKey: "Text",
    header: "Text",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Text === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },

  {
    accessorKey: "State",
    header: "State",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.State === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
