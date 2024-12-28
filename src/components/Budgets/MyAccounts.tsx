import { HStack, Text, VStack } from "@chakra-ui/react"
import React from 'react'
import useCategories from "../../hooks/general/useCategories";

const MyAccounts = () => {
  const { accountCategories } = useCategories();

  return (
    <>
      <VStack spacing={4} width="100%" maxW="400px">
        <Text fontSize="xl" fontWeight="bold">My accounts</Text>
        {accountCategories.map((account) => (
          <HStack
            key={account.id}
            width="100%"
            justifyContent="space-between"
            p={3}
            bg="gray.100"
            borderRadius="md"
          >
            <Text fontSize="md">{account.name}</Text>
            <Text fontSize="md" fontWeight="bold">{account.balance?.toFixed(2)} $</Text>
          </HStack>
        ))}
        <HStack
          width="100%"
          justifyContent="space-between"
          p={3}
          bg="green.400"
          color="white"
          borderRadius="md"
        >
          <Text fontSize="md" fontWeight="bold">Total balance</Text>
          <Text fontSize="md" fontWeight="bold">{"0.00"} $</Text>
        </HStack>
      </VStack>
    </>
  )
}

export default MyAccounts