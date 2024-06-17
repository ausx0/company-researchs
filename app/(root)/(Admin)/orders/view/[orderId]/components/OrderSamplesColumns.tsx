import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowRight, ArrowRightCircle } from "lucide-react";
import React, { HTMLProps } from "react";

export interface SubTest {
  Sub_test: string;
  Sub_test_id: number;
  Sub_test_identifier: string;
  Sub_test_reference: string | null;
  Sub_test_result: string | null;
  Sub_test_state: number;
  Sub_test_status: number;
  Sub_test_type: number;
  Subtest_template: string | null;
}

export type OrderSamplesData = {
  Sample_identifier: string;
  Tests: any[];
  SubTests: any;
};

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
                  <ArrowDown /> 🟢
                </>
              ) : (
                <>
                  <ArrowRight /> 🟢
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

export const OrderSubTestsColumns: ColumnDef<OrderSamplesData>[] = [
  // ... existing columns ...
  {
    accessorKey: "Sub_test",
    header: "Sub Test",
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
            "🟡"
          )}{" "}
          {getValue<boolean>()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Sub_test_id",
    header: "Sub Test ID",
  },
  {
    accessorKey: "Sub_test_identifier",
    header: "Sub Test Identifier",
  },
  {
    accessorKey: "Sub_test_reference",
    header: "Sub Test Reference",
  },
  {
    accessorKey: "Sub_test_result",
    header: "Sub Test Result",
  },
  {
    accessorKey: "Sub_test_state",
    header: "Sub Test State",
  },
  {
    accessorKey: "Sub_test_status",
    header: "Sub Test Status",
  },
  {
    accessorKey: "Sub_test_type",
    header: "Sub Test Type",
  },
  {
    accessorKey: "Subtest_template",
    header: "Sub Test Template",
  },
];
