import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowRight,
  ArrowRightCircle,
  Check,
  X,
} from "lucide-react";
import React, { HTMLProps } from "react";
import { OrderSampleCellAction } from "./OrderSampleAction";
import { OrderSampleTestCellAction } from "./SampleTestActions";
import { OrderSampleSubTestCellAction } from "./SampleSubtestAction";
import { OrderSampleSubTestLongText } from "./SubTestLongText";

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
  Sample_id?: number;
  Patient: any;
  Received: any;
  Test_state: any;
  Sample_state: any;
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
  {
    accessorKey: "Patient",
    header: "Patient",
  },
  {
    accessorKey: "Received",
    header: "Received",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Received === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    accessorKey: "Sample_state",
    header: "Complete",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Sample_state === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => <OrderSampleCellAction data={row.original} />,
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

  {
    accessorKey: "Test_state",
    header: "Complete",
    cell: ({ row }) => {
      // const value = row.renderValue("In_use") as number;
      // // .log(value);
      return row.original.Test_state === 1 ? (
        <Check color="green" />
      ) : (
        <X color="red" />
      );
    },
  },

  {
    header: "Actions",
    cell: ({ row }) => <OrderSampleTestCellAction data={row.original} />,
  },
];

export const OrderSubTestsColumns: ColumnDef<any>[] = [
  // ... existing columns ...
  {
    accessorKey: "Sub_test_identifier",
    header: "Subtest ID",
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
    accessorKey: "Sub_test",
    header: "Subtest",
  },
  {
    accessorKey: "Sub_test_result",
    header: "Subtest Result",
    cell: ({ row }) => {
      // Check if Sub_test_type is 2, and if so, render null for Sub_test_result
      const subTestType = row.original.Sub_test_type;
      const subTestResult = row.original.Sub_test_result;
      console.log(subTestResult, subTestType);
      return subTestType === 2 ? (
        <OrderSampleSubTestLongText data={row.original.Sub_test_result} />
      ) : (
        subTestResult
      );
    },
  },
  {
    accessorKey: "Sub_test_reference",
    header: "Subtest Reference",
  },

  {
    accessorKey: "Sub_test_status",
    header: "Subtest Status",
  },

  {
    header: "Actions",
    cell: ({ row }) => <OrderSampleSubTestCellAction data={row.original} />,
  },
];
