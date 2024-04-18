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
import { useRouter } from "next/navigation";
import React from "react";

const AddNewOrder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Button
        onPress={onOpen}
        radius="sm"
        size="sm"
        variant="flat"
        onClick={() => router.push("/add")}
      >
        Add Order <Plus />
      </Button>
    </>
  );
};

export default AddNewOrder;
