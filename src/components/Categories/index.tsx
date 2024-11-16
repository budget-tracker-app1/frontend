import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import CategoryColumn from "./CategoryColumn";

export enum CategoryType {
  ACCOUNT = "ACCOUNT",
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

const Categories = () => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Categories</Text>
      <HStack spacing={8} width="100%" maxW="900px" margin="0 auto" alignItems="flex-start">
        <CategoryColumn type={CategoryType.ACCOUNT} />
        <CategoryColumn type={CategoryType.INCOME} />
        <CategoryColumn type={CategoryType.EXPENSE} />
      </HStack>
    </>
  )
}

export default Categories