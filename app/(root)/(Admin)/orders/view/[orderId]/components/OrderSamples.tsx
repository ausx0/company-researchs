"use client";
import { apiGetLabOrderSamples } from "@/app/services/api/Orders/LabOrderSamples";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, Row } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import React, { HTMLProps } from "react";
import {
  OrderSampleColumns,
  OrderSamplesData,
  OrderTestColumns,
} from "./OrderSamplesColumns";
import { motion } from "framer-motion";

const OrderSamples = () => {
  const router = useRouter();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();

  const { data: OrderSamplesData, isLoading: OrderSamplesLoading } = useQuery({
    queryKey: ["order-samples"],
    queryFn: () => apiGetLabOrderSamples(orderId),
  });

  if (OrderSamplesLoading) {
    return <Loading />;
  }

  const renderSubComponent = ({ row }: { row: Row<OrderSamplesData> }) => {
    console.log("Row Data:", row.original); // Log the row data
    console.log("Tests Data:", row.original.Tests); // Log the Tests data
    return (
      <motion.div
        className="px-10 p-4 overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DataTable
          data={row.original.Tests[0]}
          columns={OrderTestColumns}
          searchKey="Test_identifier"
          getRowCanExpand={() => true}
          renderSubComponent={renderSubComponent}
          showColumns={false}
          showSearch={false}
          showPagination={false}
        />
      </motion.div>
    );
  };

  return (
    <>
      <DataTable
        data={OrderSamplesData}
        columns={OrderSampleColumns}
        searchKey="Sample_identifier"
        getRowCanExpand={() => true}
        renderSubComponent={renderSubComponent}
      />
    </>
  );
};

export default OrderSamples;