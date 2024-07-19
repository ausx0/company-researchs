"use client";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiGetAllOrdersBySearch } from "@/app/services/api/Orders/AllOrders";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CheckOrderSchema } from "../validation/checkOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "../../../components/FormFields/SelectField";
import { z } from "zod";
import { apiGetClients } from "@/app/services/api/Customers/Clients";
import { apiGetPatients } from "@/app/services/api/Customers/Patients";
import InputField from "../../../components/FormFields/InputField";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Loading from "@/components/ui/loading";

export default function CheckOrderClient() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const {
    getValues,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(CheckOrderSchema),
    defaultValues: {
      Order_id: undefined,
      Search_type: "0",
    },
  });

  const checkOrderMutation = useMutation({
    mutationKey: ["lab-orders"], // Fix: Pass the queryKey as an array
    mutationFn: () =>
      apiGetAllOrdersBySearch(watch("Search_type"), watch("Order_id")),
    onSuccess: (data) => {
      toast.success("orders found");
      setData(data);
    },
    onError: () => {
      toast.error("Not Found");
      setData([]);
    },
  });

  const { data: clients, isLoading: clientsLoading } = useQuery<any>({
    queryKey: ["clients"], // Fix: Pass the queryKey as an array
    queryFn: apiGetClients,
  });

  const { data: patients, isLoading: patientsLoading } = useQuery({
    queryKey: ["patients"], // Fix: Pass the queryKey as an array
    queryFn: apiGetPatients,
  });

  const Type = [
    {
      label: "Order Id",
      value: "0",
    },
    {
      label: "Client",
      value: "1",
    },
    {
      label: "Patient",
      value: "2",
    },
  ];

  // Inside the component function CheckOrderClient

  useEffect(() => {
    setValue("Order_id", undefined); // Set Order_id to undefined when Search_type changes
  }, [watch("Search_type")]); // Trigger the effect when Search_type changes

  const onSubmit = (data: any) => {
    checkOrderMutation.mutate(data);
  };

  return (
    <div className=" mx-auto flex flex-col gap-6 rounded-lg bg-slate-50 p-8">
      <Card>
        <CardHeader>Search Orders</CardHeader>
        <CardContent>
          <form
            className="p-4 gap-6 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-1 gap-8">
              <div className="flex-1">
                <SelectField
                  control={control}
                  errors={errors}
                  label="Search Type"
                  name="Search_type"
                  options={Type}
                />
              </div>
              {watch("Search_type") === "0" && (
                <div className=" flex-1">
                  <InputField
                    control={control}
                    errors={errors}
                    label="Order Id"
                    name="Order_id"
                    type="number"
                    startContent={<div>#DX-</div>}
                  />
                </div>
              )}
              {watch("Search_type") === "1" && (
                <div className=" flex-1">
                  <SelectField
                    control={control}
                    label="Order"
                    errors={errors}
                    name="Order_id"
                    options={
                      clients
                        ? clients.map((item: any) => ({
                            value: item.ID,
                            label: item.Name,
                          }))
                        : []
                    }
                  />
                </div>
              )}
              {watch("Search_type") === "2" && (
                <div className=" flex-1">
                  <SelectField
                    control={control}
                    errors={errors}
                    label="Order"
                    name="Order_id"
                    options={
                      patients
                        ? patients.map((item: any) => ({
                            value: item.ID,
                            label: item.Name,
                          }))
                        : []
                    }
                  />
                </div>
              )}
            </div>

            <div className="m-6">
              <Button variant="shadow" color="primary" type="submit">
                <Search /> Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="p-8">
        {checkOrderMutation.isPending ? (
          <Loading />
        ) : (
          <DataTable searchKey="ID" columns={columns} data={data} />
        )}
      </Card>
    </div>
  );
}
