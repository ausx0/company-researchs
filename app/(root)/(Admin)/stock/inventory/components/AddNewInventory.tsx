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
import InventoryModalForm from "./InventoryModalForm";

const AddNewInventory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Inventory <Plus />
      </Button>
      <InventoryModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewInventory;
