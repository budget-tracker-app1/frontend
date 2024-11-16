import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useRef } from 'react'
import useBudgetTrackerStore from "../../store";
import usePutCategory from "../../hooks/usePutCategory";

interface CategoryInputProps {
  category: any;
  bgcolor: string;
}

const CategoryInput = ({category, bgcolor}: CategoryInputProps) => {
  const { newCategoryStatus, setNewCategoryStatus, categoryObj, setCategoryObj, exactCategoryId, setExactCategoryId } = useBudgetTrackerStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const { saveEditedCategory } = usePutCategory();

  useEffect(() => {
    if ((newCategoryStatus || exactCategoryId) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newCategoryStatus, exactCategoryId]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = category.name;
    }
  }, [category.name]);

  const inputFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setCategoryObj({
      ...categoryObj,
      name: updatedValue,
    });
  }

  const removeNewCategory = () => {
    setNewCategoryStatus(null);
  }

  const editCategoryHandler = (category: any) => {
    if (!exactCategoryId && !newCategoryStatus) {
      setCategoryObj({
        ...categoryObj,
        name: category.name,
        type: category.type,
        color: category.color,
      });
      setExactCategoryId(category.id);
    }
  }

  const cancelEditCategory = () => {
    if (inputRef.current) {
      inputRef.current.value = category.name;
    }
    setExactCategoryId(null);
  }  

  return (
    <>
      <InputGroup>
        <Input
          ref={inputRef}
          defaultValue={category?.name || ''}
          placeholder="Category name"
          isDisabled={!((!newCategoryStatus && category.id === exactCategoryId) || (newCategoryStatus && !category.id))}
          onChange={(e) => inputFieldChange(e)}
          bgColor={bgcolor}
        />
        <InputRightElement display="flex" alignItems="center" width="auto">
          {((!newCategoryStatus && category.id !== exactCategoryId) || (category.id && !exactCategoryId)) &&
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              size="sm"
              variant="ghost"
              onClick={() => editCategoryHandler(category)}
            />
          }
          {exactCategoryId && category.id === exactCategoryId && <>
            <IconButton
              aria-label="Save"
              icon={<CheckIcon />}
              size="sm"
              variant="ghost"
              onClick={() => saveEditedCategory(exactCategoryId)}
            />
            <IconButton
              aria-label="Cancel"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={cancelEditCategory}
            />
          </>}
          {newCategoryStatus && !category.id && <IconButton
            aria-label="Delete"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            onClick={removeNewCategory}
          />}
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default CategoryInput