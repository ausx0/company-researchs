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
import PatientModalForm from "./PatientModalForm";

const AddNewPatient = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Patient <Plus />
      </Button>
      <PatientModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewPatient;
