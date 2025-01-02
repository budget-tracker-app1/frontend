import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import Cashflow from "./Cashflow"
import ExpensesChart from "./ExpensesChart"
import useFetchAllCategories from "../../hooks/http/useFetchAllCategories"
import useFetchAllTransactions from "../../hooks/http/useFetchAllTransactions"

const Finances = () => {
  const { isCategoriesLoading } = useFetchAllCategories();
  const { isTransactionsLoading } = useFetchAllTransactions();

  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Finances</Text>
      {!isCategoriesLoading && !isTransactionsLoading ?
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
      </HStack> :
      <Text>Loading...</Text>}
    </>
  )
}

export default Finances