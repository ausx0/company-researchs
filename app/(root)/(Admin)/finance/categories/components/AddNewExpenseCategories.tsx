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
import ExpenseCategoriesModalForm from "./ExpenseCategoriesModalForm";

const AddNewExpenseCategories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Expense Categories <Plus />
      </Button>
      <ExpenseCategoriesModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewExpenseCategories;
