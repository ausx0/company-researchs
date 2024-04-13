import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNewClient from "./components/AddNewClient";
import ClientsDataTable from "./components/client";

const ClientsPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Clients" description="" />
          <div>
            <AddNewClient />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <ClientsDataTable />
        </div>
      </div>
    </>
  );
};

export default ClientsPage;
