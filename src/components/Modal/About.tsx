import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  VStack,
  Divider,
} from "@chakra-ui/react";
import useBudgetTrackerStore, { EModalName } from "../../store";

const About = () => {
  const { modalName, setModalName } = useBudgetTrackerStore();

  return (
    <Modal
      isOpen={modalName === EModalName.ABOUT}
      onClose={() => setModalName(null)}
      closeOnOverlayClick={false}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About the Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Text fontWeight="bold">Project Overview</Text>
            <Text mt={2}>
              This is a personal Budget Tracker application designed to help
              users manage their finances effectively. The app allows users to
              track income, expenses and budgets in an intuitive and visually
              appealing interface. With seamless integration of the frontend and
              backend, it delivers a smooth user experience for real-time budget
              management.
              <br />
              The application is built with a focus on performance, scalability,
              and modern design principles. It showcases the integration of a
              robust backend API with a dynamic and interactive frontend.
            </Text>
          </Box>
          <Divider />
          <VStack spacing={4} align="start" mt={4}>
            <Box>
              <Text fontWeight="bold">Frontend</Text>
              <Text>
                - React: Framework for building reusable UI components.
              </Text>
              <Text>
                - React Query: Efficient server-state management and caching.
              </Text>
              <Text>
                - TypeScript: For type safety and improved productivity.
              </Text>
              <Text>
                - Chakra UI: For responsive and customizable UI components.
              </Text>
              <Text>- Zustand: Lightweight state management for React.</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Backend</Text>
              <Text>- Spring Boot: For developing RESTful APIs.</Text>
              <Text>- MySQL: Relational database for secure data storage.</Text>
              <Text>
                - Hibernate: ORM framework for managing database interactions.
              </Text>
              <Text>- Lombok: Reduces boilerplate in Java classes.</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Other Tools</Text>
              <Text>- Docker: For containerizing the app.</Text>
              <Text>- GitHub: Version control and code hosting.</Text>
              <Text>
                - CI/CD Pipelines: Automates build, test, and deployment
                processes.
              </Text>
              <Text>- Aiven: Managed MySQL database service.</Text>
              <Text>- UptimeRobot: Monitors application uptime.</Text>
              <Text>- Render: Hosting for scalable frontend and backend.</Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default About;
