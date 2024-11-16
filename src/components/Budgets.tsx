import { HStack, Text } from "@chakra-ui/react"
import React from 'react'

const Budgets = () => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Budgets</Text>
      <HStack spacing={8} width="100%" maxW="900px" margin="0 auto" alignItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">My accounts</Text>
        <Text fontSize="xl" fontWeight="bold">Transactions</Text>
      </HStack>
    </>
  )
}

export default Budgets