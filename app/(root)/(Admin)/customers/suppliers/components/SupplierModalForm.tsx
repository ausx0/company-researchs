"use Suppliers";
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
import { SuppliersSchema } from "../validation/SuppliersSchema";
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
import InputField from "../../../components/FormFields/InputField";
import { PersonIcon } from "@radix-ui/react-icons";
import { apiPostSupplier } from "@/app/services/api/Customers/Suppliers";

type cellActionProps = {
  onClose: () => void;
  isOpen: boolean;
};

const SuppliersModalForm: React.FC<cellActionProps> = ({ onClose, isOpen }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SuppliersSchema>>({
    resolver: zodResolver(SuppliersSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Phone: "",
      Address: "",
      Rep: "",

      // Price: "",
    },
  });
  const querySuppliers = useQueryClient();

  const SuppliersMutation = useMutation({
    mutationKey: ["Post-Suppliers"],
    mutationFn: apiPostSupplier,
    onSettled: async () => {
      await querySuppliers.invalidateQueries({
        queryKey: ["Lab-Suppliers"],
      }); // Invalidate the 'Suppliers' query
    },
    onSuccess: () => {
      toast.success("Suppliers added successfully");
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SuppliersSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // .log(values);
    SuppliersMutation.mutate(values);

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
                    Add Suppliers
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
                          <InputField
                            name="Email"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Email"
                            type="text"
                            icon={<MailIcon />}
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
                            name="Rep"
                            control={form.control}
                            errors={form.formState.errors}
                            label="Representative"
                            type="text"
                            icon={<PersonIcon />}
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
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

export default SuppliersModalForm;
