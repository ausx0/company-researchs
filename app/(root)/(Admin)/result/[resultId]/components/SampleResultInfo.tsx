"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "@/components/ui/loading";
import { Button, Card } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { apiSampleResultInfo } from "@/app/services/api/Results/SampleResult/SampleResultInfo";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SampleResultInfo = () => {
  const router = useRouter();
  const pathname = usePathname();
  const SampleId = pathname.split("/").pop();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["result-sample"],
    queryFn: () => apiSampleResultInfo(SampleId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-[60em]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-lg font-semibold mb-4 text-red-600">
          Sorry, the sample result could not be found.
        </div>
        <Button
          onClick={() => router.push("/result")}
          color="primary"
          className="mt-4 px-12"
        >
          Go Back
        </Button>
      </motion.div>
    );
  }

  // Sample result found, render the result
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center m-4">
            <h1 className="text-lg font-semibold uppercase">
              Sample Information
            </h1>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="p-12">
          <div className="flex justify-around">
            <div>
              <h1 className="font-bold  uppercase">Sample ID</h1>
              <p className="leading-8 text-lg">{data.Order_identifier}</p>
            </div>
            <div>
              <h1 className="font-bold  uppercase">Sample</h1>
              <p className="leading-8 text-lg">{data.Sample_type}</p>
            </div>
            <div>
              <h1 className="font-bold  uppercase">Name</h1>
              <p className="leading-8 text-lg">{data.Patient_name}</p>
            </div>
            <div>
              <h1 className="font-bold  uppercase">Date</h1>
              <p className="leading-8 text-lg">{data.Date}</p>
            </div>
            <div>
              <h1 className="font-bold  uppercase">Tests</h1>
              <p className="leading-8 text-lg capitalize">
                {data.Tests.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>{" "}
    </>
  );
};

export default SampleResultInfo;
