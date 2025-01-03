import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import React from 'react'
import MyAccounts from "./MyAccounts"
import Transactions from "../Transactions"
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
    window.location.replace('/');
  };

  const handleAboutModal = () => {
    setModalName(EModalName.ABOUT);
  }

  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Budgets</Text>
      {!isCategoriesLoading && !isTransactionsLoading ?
        <>
          <HStack
            spacing={4}
            width="100%"
            maxW="900px"
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
              bottom="50px"
              left="40px"
              bgColor="white"
              padding="5px"
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
              <Flex
                alignItems="center"
                gap="10px"
                onClick={handleLogout}
              >
                <IconButton
                  aria-label="Logout"
                  icon={<ArrowBackIcon />}
                  size="lg"
                  colorScheme="red"
                  borderRadius="full"
                  ml="2px"
                />
                <Text fontSize="20px" fontWeight="bold" color="black.500" mr="10px">
                  Logout
                </Text>
              </Flex>
            </Box>
            <Box
              position="fixed"
              bottom="50px"
              left="205px"
              bgColor="white"
              padding="5px"
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
                icon={<InfoIcon />}
                size="lg"
                colorScheme="blue"
                borderRadius="full"
                onClick={handleAboutModal}
              />
            </Box>
          </Flex>
        </> :
        <Text>Loading...</Text>
      }
    </>
  )
}

export default Budgets