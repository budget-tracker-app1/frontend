import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import React, { useEffect } from 'react'
import useBudgetTrackerStore, { EModalName } from "../../store";

const Tutorial = () => {
  const { categories, isModalOpen, setIsModalOpen, modalName, setModalName, setStartTutorial } = useBudgetTrackerStore();

  useEffect(() => {
    if (categories.length === 0) {
      setIsModalOpen(true);
      setModalName(EModalName.TUTORIAL);
    }
  }, [categories.length, setIsModalOpen, setModalName]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalName(null);
  };

  const handleTutorial = () => {
    setIsModalOpen(false);
    setModalName(null);
    setStartTutorial(true);
  }

  return (
    <>
      {modalName === EModalName.TUTORIAL &&
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
            <ModalHeader fontSize="2xl">Welcome!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg">Do you want to proceed with the tutorial step by step?</Text>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="space-between" gap="60px">
              <Button
                colorScheme="red"
                onClick={handleModalClose}
                width="100%"
              >
                Skip Tutorial
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleTutorial}
                width="100%"
              >
                Let's go!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}

export default Tutorial