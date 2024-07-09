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
import PurchaseCategoriesModalForm from "./PurchaseCategoriesModalForm";

const AddNewPurchaseCategories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Purchase Categories <Plus />
      </Button>
      <PurchaseCategoriesModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewPurchaseCategories;
