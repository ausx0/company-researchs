"use client";
import { apiGetLabOrderInvoices } from "@/app/services/api/Orders/LabOrderInvoices";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { OrderInvoicesColumns } from "./LabOrderInvoicesColumns";

const AllPaymentsOrder = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop(); // Get the id from the URL

  const { data: InvoicesData } = useQuery({
    queryKey: ["Lab-Orders-Invoices"],
    queryFn: () => apiGetLabOrderInvoices(id),
  });
  return (
    <>
      {/* <motion.div
        // className="px-10 p-4 overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      > */}
      <DataTable
        data={InvoicesData}
        columns={OrderInvoicesColumns}
        searchKey="Payer"
      />
      {/* </motion.div> */}
    </>
  );
};

export default AllPaymentsOrder;
