import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import CategoryColumn from "./CategoryColumn";
import ImportantInformation from "../Modal/ImportantInformation";
import { TutorialTargets } from "../../data/tourSteps";
import useFetchAllCategories from "../../hooks/http/useFetchAllCategories";
import useFetchAllTransactions from "../../hooks/http/useFetchAllTransactions";

export enum CategoryType {
  ACCOUNT = "ACCOUNT",
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

const Categories = () => {
  const { isCategoriesLoading } = useFetchAllCategories();
  const { isTransactionsLoading } = useFetchAllTransactions();

  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Categories</Text>
      {!isCategoriesLoading && !isTransactionsLoading ?
      <HStack spacing={8} width="100%" maxW="900px" margin="0 auto" alignItems="flex-start">
        <CategoryColumn type={CategoryType.ACCOUNT} id={TutorialTargets.AddAccountButton} />
        <CategoryColumn type={CategoryType.INCOME} id={TutorialTargets.AddIncomeButton} />
        <CategoryColumn type={CategoryType.EXPENSE} id={TutorialTargets.AddExpenseButton} />
      </HStack> :
      <Text>Loading...</Text>}
      <ImportantInformation />
    </>
  )
}

export default Categories