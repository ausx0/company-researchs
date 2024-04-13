"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import {
  MailIcon,
  MapIcon,
  MapPinIcon,
  PersonStandingIcon,
  PhoneIcon,
  Plus,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatientSchema } from "../validation/PatientSchema";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiPostPatient } from "@/app/services/api/Customers/Patients";
import InputField from "../../../components/FormFields/InputField";
import { PersonIcon } from "@radix-ui/react-icons";
import SelectField from "../../../components/FormFields/SelectField";

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
};

const PatientModalForm: React.FC<cellActionProps> = ({ onClose, isOpen }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      Name: "",
      Phone: "",
      Address: "",
      Disease: "",
      Age: undefined,
      Gender: "",
      Notes: "",

      // Price: "",
    },
  });

  const Genders = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
  ];
  const queryPatient = useQueryClient();

  const PatientMutation = useMutation({
    mutationKey: ["Post-Patient"],
    mutationFn: apiPostPatient,
    onSettled: async () => {
      await queryPatient.invalidateQueries({
        queryKey: ["Lab-Patients"],
      }); // Invalidate the 'Patients' query
    },
    onSuccess: () => {
      toast.success("Patient added successfully");
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof PatientSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    PatientMutation.mutate(values);

    // 3. Clear the form after submission.
    form.reset();
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      onClose();
    }
  }, [form.formState.isSubmitSuccessful, onClose]);

  return (
    <>
      <Modal backdrop="blur" size="xl" isOpen={isOpen} onClose={onClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Patient
                  </ModalHeader>
                  <ModalBody className="m-4">
                    <div className="flex flex-col gap-6">
                      <div>
                        <InputField
                          name="Name"
                          control={form.control}
                          errors={form.formState.errors}
                          label="Name"
                          type="text"
                        />
                      </div>
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <SelectField
                            isLoading={false}
                            control={form.control}
                            name="Gender"
                            label="Gender"
                            errors={form.formState.errors}
                            options={
                              Genders
                                ? Genders.map((item: any) => ({
                                    value: item.value,
                                    label: item.label,
                                  }))
                                : []
                            }
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="Phone"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Phone No."
                            type="text"
                            icon={<PhoneIcon />}
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <InputField
                            name="Address"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Address"
                            type="text"
                            icon={<MapPinIcon />}
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="Age"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Age"
                            type="text"
                            icon={<PersonIcon />}
                          />
                        </div>
                      </div>
                      <div className="flex w-full gap-8">
                        <div className="w-full">
                          <InputField
                            name="Notes"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Notes"
                            type="Text"
                          />
                        </div>
                        <div className="w-full">
                          <InputField
                            name="Disease"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Disease"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancle
                    </Button>
                    <Button variant="shadow" type="submit">
                      Add
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default PatientModalForm;
