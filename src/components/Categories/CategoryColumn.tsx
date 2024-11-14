import { DeleteIcon } from "@chakra-ui/icons"
import { Button, IconButton, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useRef } from 'react'
import { CategoryType } from ".";
import useBudgetTrackerStore from "../../store";
import ColorBlocks from "./ColorBlocks";
import usePostCategory from "../../hooks/usePostCategory";

export interface ICategory {
  type: string;
  name: string;
  color: string | null;
}

interface CategoryColumnProps {
  type: CategoryType;
}

const CategoryColumn = ({ type }: CategoryColumnProps) => {
  const { categories, newCategoryStatus, setNewCategoryStatus, categoryObj, setCategoryObj } = useBudgetTrackerStore();
  const { saveNewCategory } = usePostCategory();
  const inputRef = useRef<HTMLInputElement>(null);

  const incomeCategories = categories.filter((category) => category.type === CategoryType.INCOME);
  const expenseCategories = categories.filter((category) => category.type === CategoryType.EXPENSE);

  useEffect(() => {
    if (newCategoryStatus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newCategoryStatus]);

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

  const removeNewCategory = () => {
    setNewCategoryStatus(null);
  }

  const inputFieldChange = (e) => {
    const { value } = e.target;
    setCategoryObj({
      ...categoryObj,
      name: value,
    });
  }

  return (
    <>
      <VStack spacing={4} width="100%" maxW="400px">
        <Text fontSize="xl" fontWeight="bold">{type === CategoryType.INCOME ? "Incomes" : type === CategoryType.EXPENSE ? "Expenses" : ""}</Text>
        {type === CategoryType.INCOME && incomeCategories.map((category) => (
          <Input
            key={category.id}
            value={category.name}
            onChange={() => {}}
            bgColor="green.100"
          />
        ))}
        {type === CategoryType.EXPENSE && expenseCategories.map((category) => (
          <Input
            key={category.id}
            value={category.name}
            onChange={() => {}}
            bgColor="red.100"
          />
        ))}
        {type === newCategoryStatus &&
          <>
            <InputGroup>
              <Input
                ref={inputRef}
                placeholder="First Input"
                isDisabled={false}
                onChange={(e) => inputFieldChange(e)}
              />
              <InputRightElement display="flex" alignItems="center" width="auto">
                {/* <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  variant="ghost"
                /> */}
                {/* <IconButton
                  aria-label="Save"
                  icon={<CheckIcon />}
                  size="sm"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Cancel"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                /> */}
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={removeNewCategory}
                />
              </InputRightElement>
            </InputGroup>

            {type === CategoryType.EXPENSE && <ColorBlocks />}
          </>
        }
        <Button
          colorScheme="teal"
          variant="solid"
          name={type}
          onClick={(e) => {type !== newCategoryStatus ? addNewCategory(e) : saveNewCategory()}}
          isDisabled={newCategoryStatus && type !== newCategoryStatus}
        >
          {type === newCategoryStatus ? "Save" : "Add"} {type === CategoryType.INCOME ? "income" : type === CategoryType.EXPENSE ? "expense" : ""}
        </Button>
      </VStack>
    </>
  )
}

export default CategoryColumn