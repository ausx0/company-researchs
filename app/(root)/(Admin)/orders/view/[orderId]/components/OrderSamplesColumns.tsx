import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowRight, ArrowRightCircle } from "lucide-react";
import React, { HTMLProps } from "react";

export type OrderSamplesData = [];

export const OrderSampleColumns: ColumnDef<OrderSamplesData>[] = [
  {
    accessorKey: "Sample_identifier",
    header: "ID",
    cell: ({ row, getValue }) => (
      <div
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div className="flex items-center p-2 gap-2">
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
                className: "flex",
              }}
            >
              {row.getIsExpanded() ? (
                <>
                  <ArrowDown /> 🔵
                </>
              ) : (
                <>
                  <ArrowRight /> 🔵
                </>
              )}
            </button>
          ) : (
            "🔵"
          )}{" "}
          {getValue<boolean>()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Sample",
    header: "Sample",
  },
];

export const OrderTestColumns: ColumnDef<OrderSamplesData>[] = [
  {
    accessorKey: "Test_identifier",
    header: "ID",

    cell: ({ row, getValue }) => (
      <div
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div className="flex items-center p-2 gap-2">
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
                className: "flex",
              }}
            >
              {row.getIsExpanded() ? (
                <>
                  <ArrowDown /> 🔵
                </>
              ) : (
                <>
                  <ArrowRight /> 🔵
                </>
              )}
            </button>
          ) : (
            "🔵"
          )}{" "}
          {getValue<boolean>()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Test",
    header: "Test",
  },
];
