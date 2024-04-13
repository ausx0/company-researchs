import React from "react";
import ConsultationDataTable from "./components/client";
import { Payment } from "./components/columns";

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

const ConsultationPage = async () => {
  const dataSet = await getData();

  return (
    <>
      <ConsultationDataTable data={dataSet} />
    </>
  );
};
export default ConsultationPage;
