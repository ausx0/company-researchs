"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";
import SupplierModalForm from "./SupplierModalForm";

const AddNewSupplier = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Supplier <Plus />
      </Button>
      <SupplierModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewSupplier;
