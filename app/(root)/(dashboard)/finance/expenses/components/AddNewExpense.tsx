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
import ExpenseModalForm from "./ExpenseModalForm";

const AddNewExpense = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} radius="sm" size="sm" variant="flat">
        Add Expense <Plus />
      </Button>
      <ExpenseModalForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AddNewExpense;
