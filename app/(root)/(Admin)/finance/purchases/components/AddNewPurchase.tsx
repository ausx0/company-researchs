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
import PurchaseModalForm from "./PurchaseModalForm";

const AddNewPurchase = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Purchase <Plus />
      </Button>
      <PurchaseModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewPurchase;
