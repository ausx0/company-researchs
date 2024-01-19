"use client";
import React, { use, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { SampleSchema } from "../validation/TestsSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AddTestModal = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<z.infer<typeof SampleSchema>>({
    resolver: zodResolver(SampleSchema),
    defaultValues: {
      Test: "",
      Sample: "",
    },
  });

  function onSubmit(values: z.infer<typeof SampleSchema>) {
    console.log(values);
    form.reset();
    setIsOpen(false);
  }

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        Add Test <Plus />
      </Button>
      <AlertDialog open={isOpen}>
        <AlertDialogOverlay onClose={() => setIsOpen(false)} />

        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-col gap-1">
            Add Test
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <>
                <FormField
                  control={form.control}
                  name="Test"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test</FormLabel>
                      <FormControl>
                        <Input placeholder="LFT,RFT" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="Sample"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample</FormLabel>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="absolute">
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <Button onClick={() => setIsOpen(false)}>Cancel</Button>

                  <AlertDialogAction type="submit">Add</AlertDialogAction>
                </AlertDialogFooter>
              </>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddTestModal;
