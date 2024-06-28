"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PatientsData = {
  ID: any;
  Name: string;
  Age: number;
  Gender: number;
  Notes: string | null;
  Phone: string;
  Disease: string | null;
  Address: string;
  Diabetes: number | null;
  Height: number | null;
  Hypertension: number | null;
  Skin: string | null;
  Weight: number | null;
};

export const columns: ColumnDef<PatientsData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Age",
    header: "Age",
  },
  {
    accessorKey: "Gender",
    header: "Gender",
  },
  {
    accessorKey: "Notes",
    header: "Notes",
  },
  {
    accessorKey: "Phone",
    header: "Phone No.",
  },
  {
    accessorKey: "Disease",
    header: "Disease",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Diabetes",
    header: "Diabetes",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Diabetes === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },

  {
    accessorKey: "Height",
    header: "Height",
  },
  {
    accessorKey: "Hypertension",
    header: "Hypertension",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Hypertension === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    accessorKey: "Skin",
    header: "Skin",
  },
  {
    accessorKey: "Weight",
    header: "Weight",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
