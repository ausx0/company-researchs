import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

type ModalProps = {
  backdrop: "blur" | "opaque" | "transparent";
  size: "lg" | "md" | "sm";
  isOpen: boolean;
  title?: string;
  description: string;
  // onClose?: () => void;
  handleYesAction: () => void;
  handleNoAction: () => void;
};

const ModalAlert: React.FC<ModalProps> = ({
  backdrop,
  size,
  isOpen,
  title,
  description,
  // onClose,
  handleNoAction,
  handleYesAction,
}) => {
  return (
    <Modal
      backdrop={backdrop}
      size={size}
      isOpen={isOpen}
      // onClose={onClose}
      // isDismissable={false}
      // isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="text-cyan-400">{title}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-between gap-4">
            <div className="flex text-start">{description}</div>
            <div className="flex justify-end items-center gap-4">
              <Button color="danger" onClick={handleNoAction}>
                No
              </Button>
              <Button color="primary" onClick={handleYesAction}>
                Yes
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalAlert;
