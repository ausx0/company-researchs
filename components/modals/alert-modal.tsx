"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: any;
  onConfirm: any;
  loading: boolean;
  title?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = "Are you sure?",
}) => {
  return (
    <Modal backdrop="blur" title={title} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
            <ModalBody>{title}</ModalBody>
            <ModalFooter>
              {" "}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="bordered" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  variant="solid"
                  color="danger"
                  onClick={onConfirm}
                >
                  {loading ? <Spinner color="white" /> : "Confirm"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
