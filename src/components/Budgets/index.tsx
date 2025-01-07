import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import MyAccounts from "./MyAccounts";
import Transactions from "../Transactions";
import { ArrowBackIcon, InfoIcon } from "@chakra-ui/icons";
import useFetchAllCategories from "../../hooks/http/useFetchAllCategories";
import useFetchAllTransactions from "../../hooks/http/useFetchAllTransactions";
import useBudgetTrackerStore, { EModalName } from "../../store";

const Budgets = () => {
  const { isCategoriesLoading } = useFetchAllCategories();
  const { isTransactionsLoading } = useFetchAllTransactions();
  const { setModalName } = useBudgetTrackerStore();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/");
  };

  const handleAboutModal = () => {
    setModalName(EModalName.ABOUT);
  };

  return (
    <>
      <Text fontSize="1.1vw" fontWeight="bold">
        Budgets
      </Text>
      {!isCategoriesLoading && !isTransactionsLoading ? (
        <>
          <HStack
            spacing="2vw"
            width="100%"
            maxW="46.88vw"
            margin="0 auto"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <MyAccounts />
            <Transactions />
          </HStack>
          <Flex flexDir="row">
            <Box
              position="fixed"
              bottom="1.6vw"
              left="2vw"
              bgColor="white"
              padding="0.25vw"
              borderRadius={50}
              cursor="pointer"
              boxShadow="lg"
              _hover={{
                bgColor: "gray.200",
                boxShadow: "lg",
                transform: "scale(1.02)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Flex alignItems="center" gap="0.6vw" onClick={handleLogout}>
                <IconButton
                  aria-label="Logout"
                  icon={<ArrowBackIcon boxSize="1vw" />}
                  size="lg"
                  colorScheme="red"
                  borderRadius="full"
                  ml="0.1vw"
                />
                <Text
                  fontSize="1.05vw"
                  fontWeight="bold"
                  color="black.500"
                  mr="0.5vw"
                >
                  Logout
                </Text>
              </Flex>
            </Box>
            <Box
              position="fixed"
              bottom="1.6vw"
              left="10.7vw"
              bgColor="white"
              padding="0.25vw"
              borderRadius={50}
              cursor="pointer"
              boxShadow="lg"
              _hover={{
                bgColor: "gray.200",
                boxShadow: "lg",
                transform: "scale(1.02)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <IconButton
                aria-label="New Action"
                icon={<InfoIcon boxSize="1vw" />}
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                onClick={handleAboutModal}
              />
            </Box>
          </Flex>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default Budgets;
