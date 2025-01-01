import { Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import React, { useState } from 'react'
import useBudgetTrackerStore, { EModalName } from "../../store";

const ImportantInformation = () => {
  const { isModalOpen, setIsModalOpen, modalName, setModalName } = useBudgetTrackerStore();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleModalClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowModal', 'true');
    }
    setIsModalOpen(false);
    setModalName(null);
  };

  return (
    <>
      {modalName === EModalName.INFO &&
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            style={{
              border: '20px solid #444444',
              borderRadius: '20px',
              backgroundColor: '#FFF9C4'
            }}
          >
            <ModalHeader fontSize="2xl">Important Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg">Here is some important information for you regarding this action. After you add a new account, income or expense category, you will not be able to delete it anymore.</Text>
              <Checkbox
                fontSize="lg"
                mt={4}
                onChange={(e) => setDontShowAgain(e.target.checked)} 
                defaultChecked={dontShowAgain}
              >
                Don't show again
              </Checkbox>
            </ModalBody>

            <ModalFooter pt={0}>
              <Button
                colorScheme="blue"
                onClick={handleModalClose}
              >
                Got it!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

export default ImportantInformation