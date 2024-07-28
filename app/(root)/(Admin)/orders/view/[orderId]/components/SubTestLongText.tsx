"use client";
import {
  Copy,
  Delete,
  Edit,
  MoreHorizontal,
  ShowerHead,
  Trash,
  View,
  ViewIcon,
} from "lucide-react";

import toast from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderSamplesData, SubTest } from "./OrderSamplesColumns";
import { Can } from "@/app/Rules/Can";
import { apiDeleteOrderSampleSubTest } from "@/app/services/api/Orders/LabOrderSamples";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export interface cellActionProps {
  data: any;
}

export const OrderSampleSubTestLongText: React.FC<cellActionProps> = ({
  data,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal
        backdrop="blur"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="overflow-hidden"
      >
        {" "}
        <ModalContent className="overflow-auto h-[70vh]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Long text
              </ModalHeader>
              <ModalBody>
                <div dangerouslySetInnerHTML={{ __html: data }} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Pass the ID as a prop */}
      {/* <Can I={"read"}> */}
      <Button size="sm" color="primary" onPress={onOpen}>
        <ViewIcon />
      </Button>

      {/* </Can> */}
    </>
  );
};
