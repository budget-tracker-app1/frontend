import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import Cashflow from "./Cashflow"
import ExpensesChart from "./ExpensesChart"

const Finances = () => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Finances</Text>
      <HStack
        spacing={4}
        width="100%"
        maxW="900px"
        margin="0 auto"
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <ExpensesChart />
        <Cashflow />
      </HStack>
    </>
  )
}

export default Finances