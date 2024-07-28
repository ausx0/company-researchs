"use client";
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenText,
  ClipboardList,
  CreditCard,
  PersonStandingIcon,
  SendToBack,
  Timer,
  UserRoundSearch,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  apiGetAllCurrentOrders,
  apiGetAllCurrentOrdersCount,
} from "@/app/services/api/Home/CurrentOrders";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { AbilityContext, Can } from "@/app/Rules/Can";
import { useEffect } from "react";
import { apiGetAllCompletedOrders } from "@/app/services/api/Home/CompletedOrders";
import Loading from "@/components/ui/loading";
import { CurrentCellAction } from "./components/currentCellActions";
import { useRouter } from "next/navigation";
import { apiGetAllPendingPayments } from "@/app/services/api/Home/PendingPayments";
import { apiGetAllPendingOrders } from "@/app/services/api/Home/PendingOrders";
import { apiGetAllAppointments } from "@/app/services/api/Home/Appoinments";

const HoemPage = () => {
  // const ability = useContext(AbilityContext);
  const router = useRouter();

  const {
    data: CurrentOrders,
    isLoading: CurrentOrdersLoading,
    error: CurrentOrdersError,
  } = useQuery({
    queryKey: ["current_orders"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllCurrentOrders,
  });

  const {
    data: PendingPayments,
    isLoading: PendingPaymentsLoading,
    error: PendingPaymentsError,
  } = useQuery({
    queryKey: ["pending_payments"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllPendingPayments,
  });

  const {
    data: CompletedOrders,
    isLoading: CompletedOrdersLoading,
    error: CompletedOrdersError,
  } = useQuery({
    queryKey: ["completed-orders"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllCompletedOrders,
  });

  const {
    data: PendingOrders,
    isLoading: PendingOrdersLoading,
    error: PendingOrdersError,
  } = useQuery({
    queryKey: ["pending-orders"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllPendingOrders,
  });

  const {
    data: Appointments,
    isLoading: AppointmentsLoading,
    error: AppointmentsError,
  } = useQuery({
    queryKey: ["appointments"], // Fix: Pass the queryKey as an array
    queryFn: apiGetAllAppointments,
  });

  if (
    CurrentOrdersLoading ||
    CompletedOrdersLoading ||
    PendingPaymentsLoading ||
    PendingOrdersLoading ||
    AppointmentsLoading
  ) {
    return <Spinner />;
  }

  const currentOrdersLength = CurrentOrders ? CurrentOrders.length : 0;
  const completedOrdersLength = CompletedOrders ? CompletedOrders.length : 0;
  const pendingPaymentsLength = PendingPayments ? PendingPayments.length : 0;
  const PendingOrdersLength = PendingOrders ? PendingOrders.length : 0;
  const AppointmentsLength = Appointments ? Appointments.length : 0;

  return (
    <>
      <div className="grid gap-4 grid-cols-4 grid-rows-8  bg-slate-100 p-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle className="text-sm text-mutedsh-foreground ">
              Current Orders
            </CardTitle>
            <SendToBack className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">{currentOrdersLength}</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Current Orders
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle className="text-sm text-mutedsh-foreground ">
              Pending Payments
            </CardTitle>
            <CreditCard className="size-4" />
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">{pendingPaymentsLength}</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Pending Payments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle className="text-sm text-mutedsh-foreground ">
              Pending Orders
            </CardTitle>
            <UserRoundSearch className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">{PendingOrdersLength}</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Pending Orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle className="text-sm text-mutedsh-foreground ">
              Appointments
            </CardTitle>
            <UserRoundSearch className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">{AppointmentsLength}</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Appointments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white col-span-4 row-span-4 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Current Orders</CardTitle>
            <SendToBack className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="px-0 h-[50vh] overflow-auto">
            {CurrentOrdersLoading ? (
              <Loading />
            ) : (
              <>
                {CurrentOrders.length === 0 ? (
                  <h1 className="text-md font-bold">No Orders Found</h1>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {CurrentOrders.map((order: any) => (
                      <li
                        key={order.ID}
                        className="py-4 px-2 flex justify-between items-center hover:bg-slate-100 rounded-md cursor-pointer transition"
                        onClick={() => router.push(`/orders/view/${order.ID}`)}
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {order.Order_identifier}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.Client_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {order.Date}
                          </p>
                          <p className="text-sm text-gray-600">
                            Samples: {order.Samples}
                          </p>
                        </div>
                        <CurrentCellAction data={order} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-3 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Upcoming Appointments</CardTitle>
            <UserRoundSearch className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            {CurrentOrdersLoading ? (
              <Loading />
            ) : (
              <>
                {Appointments.length === 0 ? (
                  <h1 className="text-md font-bold">No Appointments Found</h1>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {Appointments.map((order: any) => (
                      <li
                        key={order.ID}
                        className="py-4 px-2 flex justify-between items-center hover:bg-slate-100 rounded-md cursor-pointer transition"
                        // onClick={() => router.push(`/orders/view/${order.ID}`)}
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {order.Order_identifier}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.Client_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {order.Date}
                          </p>
                          <p className="text-sm text-gray-600">
                            Samples: {order.Samples}
                          </p>
                        </div>
                        <CurrentCellAction data={order} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}{" "}
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-3 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Current Tasks</CardTitle>
            <ClipboardList className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <h1 className="text-md font-bold">No Tasks Found</h1>
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-4 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Pending Payments</CardTitle>
            <CreditCard className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent className="px-0">
            {CurrentOrdersLoading ? (
              <Loading />
            ) : (
              <>
                {PendingPayments.length === 0 ? (
                  <h1 className="text-md font-bold">
                    No Pending Payments Found
                  </h1>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {PendingPayments.map((order: any) => (
                      <li
                        key={order.ID}
                        className="py-4 px-2 flex justify-between items-center hover:bg-slate-100 rounded-md cursor-pointer transition"
                        onClick={() => router.push(`/orders/view/${order.ID}`)}
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {order.Order_identifier}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.Client_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {order.Date}
                          </p>
                          <p className="text-sm text-gray-600">
                            Samples: {order.Samples}
                          </p>
                        </div>
                        {/* <CurrentCellAction data={order} /> */}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-2 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Pending Orders</CardTitle>
            <CreditCard className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            {PendingOrdersLoading ? (
              <Loading />
            ) : (
              <>
                {PendingOrdersLength.length === 0 ? (
                  <h1 className="text-md font-bold">No Pending Orders Found</h1>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {PendingOrders.map((order: any) => (
                      <li
                        key={order.ID}
                        className="py-4 px-2 flex justify-between items-center hover:bg-slate-100 rounded-md cursor-pointer transition"
                        onClick={() => router.push(`/orders/view/${order.ID}`)}
                      >
                        <div>
                          <p className="text-lg font-semibold">
                            {order.Order_identifier}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.Client_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {order.Date}
                          </p>
                          <p className="text-sm text-gray-600">
                            Samples: {order.Samples}
                          </p>
                        </div>
                        <CurrentCellAction data={order} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}{" "}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HoemPage;
