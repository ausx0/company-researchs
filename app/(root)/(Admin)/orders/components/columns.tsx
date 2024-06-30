"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-actions";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrdersData = {
  ID: string;
  State: number;
  Sample: string;
};

export const columns: ColumnDef<OrdersData>[] = [
  {
    accessorKey: "Order_identifier",
    header: "ID",
  },
  {
    accessorKey: "Client_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "Date",
    header: "Date",
  },
  {
    accessorKey: "Total",
    header: "Total",
    cell: ({ row }) => <>{formatPrice(row.getValue("Total"))}</>, // Render the formatted price
  },
  {
    accessorKey: "Referred",
    header: "Referred",
  },
  {
    accessorKey: "Payment_status",
    header: "Payment Status",
  },
  {
    accessorKey: "State",
    header: "State",
    cell: ({ row }) => {
      const state = row.getValue("State");
      return <StateBadge state={state} />;
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
