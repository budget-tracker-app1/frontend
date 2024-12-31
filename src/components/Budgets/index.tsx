import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react"
import React from 'react'
import MyAccounts from "./MyAccounts"
import Transactions from "../Transactions"
import { ArrowBackIcon } from "@chakra-ui/icons";

const Budgets = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Budgets</Text>
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
      <Box
        position="fixed"
        bottom="50px"
        left="40px"
        bgColor="white"
        padding="10px 20px"
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
          />
          <Text fontSize="20px" fontWeight="bold" color="black.500">
            Logout
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default Budgets