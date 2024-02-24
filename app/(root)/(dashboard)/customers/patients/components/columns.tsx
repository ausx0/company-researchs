"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PatientsData = {
  ID: string;
  Name: string;
  Age: number;
  Gender: string;
  Notes: string;
  Phone: string;
  Disease: string;
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
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
