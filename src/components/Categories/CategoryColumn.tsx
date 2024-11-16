import { Button, Text, VStack } from "@chakra-ui/react"
import React from 'react'
import { CategoryType } from ".";
import useBudgetTrackerStore from "../../store";
import ColorBlocks from "./ColorBlocks";
import usePostCategory from "../../hooks/usePostCategory";
import CategoryInput from "./CategoryInput";

export interface ICategory {
  type: string;
  name: string;
  color: string | null;
}

interface CategoryColumnProps {
  type: CategoryType;
}

const CategoryColumn = ({ type }: CategoryColumnProps) => {
  const { categories, newCategoryStatus, setNewCategoryStatus, categoryObj, setCategoryObj, exactCategoryId } = useBudgetTrackerStore();
  const { saveNewCategory } = usePostCategory();

  const accountCategories = categories.filter((category) => category.type === CategoryType.ACCOUNT);
  const incomeCategories = categories.filter((category) => category.type === CategoryType.INCOME);
  const expenseCategories = categories.filter((category) => category.type === CategoryType.EXPENSE);

  const addNewCategory = (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === type && !newCategoryStatus) {
      setNewCategoryStatus(name);
      setCategoryObj({
        ...categoryObj,
        type: name,
      });
    }
  };

  return (
    <VStack spacing={4} width="100%" maxW="400px">
      <Text fontSize="xl" fontWeight="bold">{type === CategoryType.INCOME ? "Incomes" : type === CategoryType.EXPENSE ? "Expenses" : type === CategoryType.ACCOUNT ? "Accounts" : ""}</Text>
      {type === CategoryType.ACCOUNT && accountCategories.map((category) => (
        <CategoryInput
          key={category.id}
          category={category}
          bgcolor={"gray.300"}
        />
      ))}
      {type === CategoryType.INCOME && incomeCategories.map((category) => (
        <CategoryInput
          key={category.id}
          category={category}
          bgcolor={"green.100"}
        />
      ))}
      {type === CategoryType.EXPENSE && expenseCategories.map((category) => (
        <>
          <CategoryInput
            key={category.id}
            category={category}
            bgcolor={"red.100"}
          />
          {type === CategoryType.EXPENSE && exactCategoryId === category.id && <ColorBlocks expenseCategories={expenseCategories} type={type} />}
        </>
      ))}
      {type === newCategoryStatus &&
        <>
          <CategoryInput
            category={{}}
            bgcolor={type === CategoryType.EXPENSE ? "red.100" : type === CategoryType.INCOME ? "green.100" : type === CategoryType.ACCOUNT ? "gray.300" : "white"}
          />
          {type === CategoryType.EXPENSE && <ColorBlocks expenseCategories={expenseCategories} type={type} />}
        </>
      }
      <Button
        colorScheme="teal"
        variant="solid"
        name={type}
        onClick={(e) => {type !== newCategoryStatus ? addNewCategory(e) : saveNewCategory()}}
        isDisabled={
          (newCategoryStatus !== null && type !== newCategoryStatus)
          ||
          (exactCategoryId !== null)
          ||
          (type === CategoryType.ACCOUNT && accountCategories.length >= 10)
          ||
          (type === CategoryType.INCOME && incomeCategories.length >= 10)
          ||
          (type === CategoryType.EXPENSE && expenseCategories.length >= 10)
        }
      >
        {type === newCategoryStatus ? "Save" : "Add"} {type === CategoryType.INCOME ? "income" : type === CategoryType.EXPENSE ? "expense" : type === CategoryType.ACCOUNT ? "account" : ""}
      </Button>
    </VStack>
  )
}

export default CategoryColumn