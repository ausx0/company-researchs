"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import React from "react";
import TestModalForm from "./TestModalForm";
import { withAuthorization } from "@/app/Rules/Authorization";

const AddNewTest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Test <Plus />
      </Button>
      <TestModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default withAuthorization(AddNewTest, ["lab-tech"]); // Only allow 'Admin' and 'lab-tech' to access this page
