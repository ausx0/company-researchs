"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersData = {
  ID: string;
  Test: string;
  SubTest: string[];
  Price: number;
};

export const columns: ColumnDef<OrdersData>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Test",
    header: "Test",
  },
  {
    accessorKey: "SubTest",
    header: "SubTest",
    cell: ({ row }) => row.original.SubTest || "",
  },
  {
    accessorKey: "Price",
    header: "Price",
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <CellAction data={row.original} />,
  //   },
];
