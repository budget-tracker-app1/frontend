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
              border: '1.2vw solid #444444',
              borderRadius: '1vw',
              backgroundColor: '#FFF9C4'
            }}
          >
            <ModalHeader fontSize="1.27vw">Important Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="0.96vw">Here is some important information for you regarding this action. After you add a new account, income or expense category, you will not be able to delete it anymore.</Text>
              <Checkbox
                mt="1vw"
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