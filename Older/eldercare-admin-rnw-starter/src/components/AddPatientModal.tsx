import React from "react";
import { AddPatientWizard } from "./AddPatientWizard";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";

interface AddPatientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  validationEnabled: boolean;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  open,
  onOpenChange,
  validationEnabled,
}) => {
  return (
    <Modal isOpen={open} onClose={() => onOpenChange(false)} size="xl">
      <ModalBackdrop />
      <ModalContent className="bg-slate-950 border border-slate-800 max-h-[90vh]">
        <ModalHeader className="border-b border-slate-800">
          <Heading size="sm" className="text-slate-50">
            Add New Patient
          </Heading>
        </ModalHeader>
        <ModalBody className="pt-4 pb-2">
          <AddPatientWizard
            validationEnabled={validationEnabled}
            onComplete={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </ModalBody>
        <ModalFooter className="border-t border-slate-800">
          <Button
            variant="outline"
            className="border-slate-700"
            onPress={() => onOpenChange(false)}
          >
            <ButtonText className="text-slate-200">Close</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
