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
import SampleModalForm from "./SampleModalForm";

const AddNewSample = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Sample <Plus />
      </Button>
      <SampleModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewSample;
