import { Separator } from "@/components/ui/separator";
import React from "react";
import CheckOrderClient from "./components/client";
import { Heading } from "@/components/ui/heading";

const page = () => {
  return (
    <div className=" mx-auto py-2">
      <div className="flex justify-between py-2">
        <Heading title="Check Order" description="" />
      </div>

      <Separator />
      <div className="py-4">
        <CheckOrderClient />
      </div>
    </div>
  );
};

export default page;
