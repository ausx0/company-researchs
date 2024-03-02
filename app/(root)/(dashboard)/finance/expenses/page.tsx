import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ExpensesDataTable from "./components/client";
import AddNewPatient from "./components/AddNewExpense";

const ExpensesPage = () => {
  return (
    <>
      <div className=" mx-auto py-2">
        <div className="flex justify-between py-2">
          <Heading title="Expenses" description="" />
          <div>
            <AddNewPatient />
          </div>
        </div>

        <Separator />
        <div className="py-4">
          <ExpensesDataTable />
        </div>
      </div>
    </>
  );
};

export default ExpensesPage;
