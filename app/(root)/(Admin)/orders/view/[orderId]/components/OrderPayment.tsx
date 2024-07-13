"use client";
import { apiGetLabOrderInvoices } from "@/app/services/api/Orders/LabOrderInvoices";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const OrderPayment = () => {
  const router = useRouter();
  const pathname = usePathname();
  const orderId = pathname.split("/").pop();

  const { data: OrderPaymentData, isLoading: OrderPaymentDataLoading } =
    useQuery({
      queryKey: ["order-payment"],
      queryFn: () => apiGetLabOrderInvoices(orderId),
    });

  if (OrderPaymentDataLoading) {
    return <Loading />;
  }

  const columns = [
    {
      accessorKey: "ID",
      header: "ID",
    },
    {
      accessorKey: "Amount",
      header: "Amount",
      // cell: ({ row }) => row.original.Test.label,
    },
    {
      accessorKey: "Payer",
      header: "Payer",
    },
    {
      accessorKey: "Date",
      header: "Date",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">Payment History</h1>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={OrderPaymentData}
            columns={columns}
            searchKey="ID"
            showSearch={false}
            showPagination={false}
            showColumns={false}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default OrderPayment;
