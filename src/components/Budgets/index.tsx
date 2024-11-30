import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import MyAccounts from "./MyAccounts"
import Transactions from "../Transactions"

const Budgets = () => {
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
    </>
  )
}

export default Budgets