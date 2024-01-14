import React from "react";
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
  UserRoundSearch,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HoemPage = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-4 grid-rows-8">
        <Card className="bg-white">
          <CardHeader className="flex flex-row justify-between items-center ">
            <CardTitle className="text-sm text-mutedsh-foreground ">
              Appointments
            </CardTitle>
            <UserRoundSearch className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <h1 className="text-2xl font-bold">200</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Appointments
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
            <h1 className="text-2xl font-bold">200</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Appointments
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
            <h1 className="text-2xl font-bold">200</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Appointments
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
            <h1 className="text-2xl font-bold">200</h1>
            <p className="text-xs text-mutedsh-foreground">
              The Amount Of Appointments
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-2 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Current Researches</CardTitle>
            <BookOpenText className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <h1 className="text-md font-bold">No Researches Found</h1>
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-3 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Upcoming Appointments</CardTitle>
            <UserRoundSearch className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <h1 className="text-md font-bold">No Appointments Found</h1>
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
          <CardContent>
            <h1 className="text-md font-bold">No Pending Payments Found</h1>
          </CardContent>
        </Card>

        <Card className="bg-white col-span-2 row-span-2 p-4">
          <CardHeader className="flex flex-row justify-between items-center p-2 ">
            <CardTitle className="text-xl ">Pending Review</CardTitle>
            <CreditCard className="" />
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <h1 className="text-md font-bold">No Pending Review Found</h1>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HoemPage;
