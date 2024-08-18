"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { withAuthorization } from "@/app/Rules/Authorization";
import AddNewSupplier from "./components/AddNewSupplier";
import SuppliersDataTable from "./components/client";

const SuppliersPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Suppliers" description="" />
          <div>
            <AddNewSupplier />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <SuppliersDataTable />
        </div>
      </div>
    </>
  );
};

export default withAuthorization(SuppliersPage, ["Admin"]);
