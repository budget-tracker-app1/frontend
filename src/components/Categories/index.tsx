import { HStack, Text } from "@chakra-ui/react"
import React from 'react'
import CategoryColumn from "./CategoryColumn";
import ImportantInformation from "../Modal/ImportantInformation";

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
        <CategoryColumn type={CategoryType.ACCOUNT} id="add-category-button" />
        <CategoryColumn type={CategoryType.INCOME} id="category-input" />
        <CategoryColumn type={CategoryType.EXPENSE} id="save-category-button" />
      </HStack>
      <ImportantInformation />
    </>
  )
}

export default Categories