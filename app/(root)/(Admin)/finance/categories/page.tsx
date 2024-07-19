import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import AddNewExpenseCategories from "./components/AddNewExpenseCategories";
import ExpenseCategoriesDataTable from "./components/client";

const ExpenseCategoriesPage = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Expense Categories" description="" />
        <div>
          <AddNewExpenseCategories />
        </div>
      </div>

      <Separator />
      <div className="py-4">
        <ExpenseCategoriesDataTable />
      </div>
    </div>
  );
};

export default ExpenseCategoriesPage;
