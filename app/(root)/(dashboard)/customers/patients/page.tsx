import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import PatientsDataTable from "./components/client";
import AddNewPatient from "./components/AddNewPatient";

const PatientsPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Patients" description="" />
          <div>
            <AddNewPatient />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <PatientsDataTable />
        </div>
      </div>
    </>
  );
};

export default PatientsPage;
