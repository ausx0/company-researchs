"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";
import ClientModalForm from "./ClientModalForm";

const AddNewClient = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Client <Plus />
      </Button>
      <ClientModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewClient;
