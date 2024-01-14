import React from "react";
import { Payment } from "./components/columns";
import SamplesDataTable from "./components/client";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
      title: "ahmed dsaxfdasgfasngfasjnfasbfasbfashbfasbdhasgvbgvfghabvhebas",
    },
  ];
}

const ResearchesPage = async () => {
  const dataSet = await getData();

  return (
    <>
      <SamplesDataTable data={dataSet} />
    </>
  );
};
export default ResearchesPage;
