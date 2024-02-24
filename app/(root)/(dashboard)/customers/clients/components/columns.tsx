"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientsData = {
  ID: string;
  Address: string;
  Email: string;
  Name: string;
  Phone: string;
  Rep: string;
};

export const columns: ColumnDef<ClientsData>[] = [
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
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "Phone",
    header: "Phone No.",
  },
  {
    accessorKey: "Address",
    header: "Address",
  },
  {
    accessorKey: "Rep",
    header: "Representative",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
