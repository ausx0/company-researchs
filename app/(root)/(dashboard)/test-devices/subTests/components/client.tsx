"use client";
import React from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface PaymentClientProps {
  data: Payment[];
}

const SubTestsDataTable: React.FC<PaymentClientProps> = ({ data }) => {
  const router = useRouter();

  const AddNewButton = () => {
    router.push("/samples/add");
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sub Tests (${data.length})`} description="" />
        <Button onClick={() => router.push("subTests/add")}>
          Add New <Plus />
        </Button>
      </div>
      <Separator className="m-2" />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default SubTestsDataTable;
