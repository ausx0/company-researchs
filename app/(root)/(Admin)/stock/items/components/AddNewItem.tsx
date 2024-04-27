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
import ItemModalForm from "./ItemModalForm";

const AddNewItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Item <Plus />
      </Button>
      <ItemModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewItem;
