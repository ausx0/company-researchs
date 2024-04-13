"use client";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import TestsDataTable from "./components/client";
import { useRouter } from "next/navigation";
import SubTestsDataTable from "./components/client";

const SubTestsPage = () => {
  const router = useRouter();
  return <SubTestsDataTable />;
};

export default SubTestsPage;
