"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FlaskRound } from "lucide-react";
import { SubTestSchema } from "../validation/SubTestSchema";
import { z } from "zod";

const SubTestForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SubTestSchema>>({
    resolver: zodResolver(SubTestSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SubTestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col">
            <div className="flex">
              <FormField
                control={form.control}
                name="Test"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test</FormLabel>
                    <FormControl>
                      <Input placeholder="Test" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SubTestForm;
