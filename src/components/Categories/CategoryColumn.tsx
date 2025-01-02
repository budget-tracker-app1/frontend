import { Button, Text, VStack } from "@chakra-ui/react"
import React from 'react'
import { CategoryType } from ".";
import useBudgetTrackerStore, { EModalName } from "../../store";
import ColorBlocks from "./ColorBlocks";
import usePostCategory from "../../hooks/http/usePostCategory";
import CategoryInput from "./CategoryInput";
import useCategories from "../../hooks/general/useCategories";
import { TutorialTargets } from "../../data/tourSteps";

export interface ICategory {
  id?: number;
  name: string | null;
  type: CategoryType | null;
  userId?: number;
  color?: string;
  balance?: number;
}

interface CategoryColumnProps {
  type: CategoryType;
  id: TutorialTargets;
}

const CategoryColumn = ({ type, id }: CategoryColumnProps) => {
  const { newCategoryStatus, setNewCategoryStatus, categoryObj, setCategoryObj, exactCategoryId, setIsModalOpen, setModalName } = useBudgetTrackerStore();

  const { saveNewCategory } = usePostCategory();
  const { accountCategories, incomeCategories, expenseCategories } = useCategories();

  const addNewCategory = (e: React.MouseEvent) => {
    if (!localStorage.getItem('dontShowModal')) {
      setModalName(EModalName.INFO);
      setIsModalOpen(true);
    }
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
      {type === CategoryType.ACCOUNT && accountCategories?.map((category) => (
        <CategoryInput
          key={category.id}
          category={category}
          bgcolor={"gray.300"}
        />
      ))}
      {type === CategoryType.INCOME && incomeCategories?.map((category) => (
        <CategoryInput
          key={category.id}
          category={category}
          bgcolor={"green.100"}
        />
      ))}
      {type === CategoryType.EXPENSE && expenseCategories?.map((category) => (
        <>
          <CategoryInput
            key={category.id}
            category={category}
            bgcolor={"red.100"}
          />
          {type === CategoryType.EXPENSE && exactCategoryId === category.id && <ColorBlocks />}
        </>
      ))}
      {type === newCategoryStatus &&
        <>
          <CategoryInput
            category={{}}
            bgcolor={type === CategoryType.EXPENSE ? "red.100" : type === CategoryType.INCOME ? "green.100" : type === CategoryType.ACCOUNT ? "gray.300" : "white"}
          />
          {type === CategoryType.EXPENSE && <ColorBlocks />}
        </>
      }
      <Button
        id={id}
        colorScheme="teal"
        variant="solid"
        name={type}
        onClick={(e) => {type !== newCategoryStatus ? addNewCategory(e) : saveNewCategory()}}
        isDisabled={
          (newCategoryStatus !== null && type !== newCategoryStatus)
          ||
          (exactCategoryId !== null)
          ||
          (type === CategoryType.ACCOUNT && accountCategories && accountCategories.length >= 10)
          ||
          (type === CategoryType.INCOME && incomeCategories && incomeCategories.length >= 10)
          ||
          (type === CategoryType.EXPENSE && expenseCategories && expenseCategories.length >= 10)
        }
      >
        {type === newCategoryStatus ? "Save" : "Add"} {type === CategoryType.INCOME ? "income" : type === CategoryType.EXPENSE ? "expense" : type === CategoryType.ACCOUNT ? "account" : ""}
      </Button>
    </VStack>
  )
}

export default CategoryColumn