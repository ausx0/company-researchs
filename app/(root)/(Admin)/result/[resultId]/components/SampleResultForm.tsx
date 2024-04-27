"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Card, Input } from "@nextui-org/react";
import { CardContent, CardHeader } from "@/components/ui/card";
import JoditEditor from "jodit-react";
import InputField from "../../../components/FormFields/InputField";
import { apiSampleResultsEdit } from "@/app/services/api/Results/SampleResult/EditSampleResult";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import toast from "react-hot-toast";

// Define the shape of your form data using the FormValues type provided by react-hook-form
type FormValues = {
  Tests: {
    Subtests: {
      Result: string;
      Subtest_id: string;
    }[];
  }[];
};

const SampleResultForm = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  // 		placeholder: "hello" || 'Start typings...'
  // 	},
  // 	[]
  // );
  const { data, isLoading, isError } = useQuery<{
    Tests: {
      Test: string;
      Subtests: {
        [x: string]: any;
        Subtest: string;
        Result_type: number;
        Result: string;
        Reference: string;
      }[];
    }[];
  }>({
    queryKey: ["result-sample"],
  });

  const { mutate } = useMutation({
    mutationKey: ["patch-sample-results"],
    mutationFn: apiSampleResultsEdit,
    onSuccess: () => toast.success("Result Updated Successfully"),
    onError: () => toast.error("Something Went Wrong"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>(); // Specify FormValues as the type argument

  if (isLoading || isError || !data) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }
  // Define onSubmit as a function with FormValues as parameters
  const onSubmit = (formData: FormValues, cardIndex: number) => {
    const cardData = formData.Tests[cardIndex];
    const querySubtests = data.Tests[cardIndex].Subtests; // Get the Subtests from query data
    const mutatedData = {
      ...cardData,
      Subtests: cardData.Subtests.map((subtest, subIndex) => ({
        ...subtest,
        Result: subtest.Result,
        Subtest_id: querySubtests[subIndex].Subtest_id, // Include the Subtest_id from query data
      })),
    };
    console.log("Submitting card index:", cardIndex);
    console.log("Card data:", mutatedData);
    mutate(mutatedData);
  };

  return (
    <>
      {data.Tests.map((test, index) => (
        <Card key={index} shadow="md" className="my-4">
          <CardHeader>
            <div className="flex justify-between items-center m-4">
              <h1 className="text-lg font-semibold ">{test.Test}</h1>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit((formData) => onSubmit(formData, index))}
            >
              {test.Subtests.map((subtest, subIndex) => (
                <div key={subIndex} className="flex flex-col gap-4">
                  <div className="flex gap-6 items-center my-8">
                    {subtest.Result_type === 1 ? (
                      <InputField
                        errors={errors}
                        type="text"
                        name={`Tests[${index}].Subtests[${subIndex}].Result`}
                        defaultValue={subtest.Result || ""}
                        label={subtest.Subtest}
                        placeholder="Result"
                        className="mr-4 w-full"
                        control={control}
                      />
                    ) : subtest.Result_type === 3 ? (
                      <InputField
                        errors={errors}
                        type="text"
                        name={`Tests[${index}].Subtests[${subIndex}].Result`}
                        defaultValue={subtest.Result || ""}
                        label={subtest.Subtest}
                        placeholder="Result"
                        className="mr-4 w-full"
                        control={control}
                      />
                    ) : (
                      <div style={{ width: "100%" }}>
                        <label className="text-lg font-semibold my-4">
                          {subtest.Subtest}
                        </label>
                        <JoditEditor
                          ref={editor}
                          value={subtest.Result || ""}
                          config={{
                            height: "70em",
                            colorPickerDefaultTab: "background",
                            statusbar: true,
                          }}
                          onBlur={(newContent) => setContent(newContent)}
                          onChange={(newContent) =>
                            setValue(
                              `Tests[${index}].Subtests[${subIndex}].Result` as `Tests.${number}.Subtests.${number}.Result`,
                              newContent
                            )
                          }
                        />
                      </div>
                    )}
                    {subtest.Result_type !== 1 && subtest.Result_type !== 2 && (
                      <Input
                        value={subtest.Reference}
                        label="Reference"
                        disabled
                        className="mr-4"
                      />
                    )}
                  </div>
                  <div>{/* <Separator /> */}</div>
                </div>
              ))}
              <Button color="primary" type="submit" className="m-6 px-12">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SampleResultForm;
