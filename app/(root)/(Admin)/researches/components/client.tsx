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

const ReseachesDataTable: React.FC<PaymentClientProps> = ({ data }) => {
  const router = useRouter();

  const AddNewButton = () => {
    router.push("/researches/add");
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Reseachers (${data.length})`} description="" />
        <Button onClick={AddNewButton}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};

export default ReseachesDataTable;
