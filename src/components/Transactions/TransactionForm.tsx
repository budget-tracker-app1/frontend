import { FormControl, FormLabel, HStack, Input, Select } from "@chakra-ui/react"
import React from 'react'
import useBudgetTrackerStore from "../../store";
import { CategoryType } from "../Categories";
import useCategories from "../../hooks/general/useCategories";
import { IIncomeTransaction } from ".";

interface TransactionFormProps {
  firstPlaceholder: string;
  secondPlaceholder: string;
  selectBox: any[];
}

const TransactionForm = ({ firstPlaceholder, secondPlaceholder, selectBox }: TransactionFormProps) => {
  const { newTransactionStatus, incomeTransactionObj, setIncomeTransactionObj, newCategoryStatus } = useBudgetTrackerStore();
  const { accountCategories } = useCategories();

  const handleSelectBoxChange = (e: React.ChangeEvent<HTMLSelectElement>, type: CategoryType) => {
    const { value } = e.target;
    const categoryId = accountCategories.find(category => category.name === value)?.id;
    
    if (type === CategoryType.ACCOUNT) {
      setIncomeTransactionObj({
        ...incomeTransactionObj as IIncomeTransaction,
        account: value,
        category_id: categoryId,
      });
    }
    if (type === CategoryType.INCOME) {
      setIncomeTransactionObj({
        ...incomeTransactionObj as IIncomeTransaction,
        income: value,
      });
    }
    if (type === CategoryType.EXPENSE) {
      setIncomeTransactionObj({
        ...incomeTransactionObj as IIncomeTransaction,
        income: value,
      });
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // if (/[^0-9.]/.test(input)) {
    //   input = input.replace(/[^0-9.]/g, '');
    // }

    // if (input.indexOf('.') !== input.lastIndexOf('.')) {
    //   input = input.slice(0, input.lastIndexOf('.'));
    // }

    // if (input === '') {
    //   input = '0';
    // }

    // if (input.startsWith('0') && input.length > 1 && input[1] !== '.') {
    //   input = input.slice(1);
    // }

    // if (input.includes('.') && input.split('.')[1]?.length > 2) {
    //   input = input.slice(0, input.indexOf('.') + 3);
    // }

    setIncomeTransactionObj({
      ...incomeTransactionObj as IIncomeTransaction,
      amount: parseFloat(input) || 0,
    });
  };

  return (
    <>
      <FormLabel>New {newTransactionStatus?.toLowerCase()}</FormLabel>
      <HStack spacing={4} width="100%">
        <FormControl id="account">
          <Select
            placeholder={firstPlaceholder}
            onChange={(e) => handleSelectBoxChange(e, CategoryType.ACCOUNT)}
          >
            {accountCategories?.map((account: any) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id={newCategoryStatus?.toLowerCase()}>
          <Select
            placeholder={secondPlaceholder}
            onChange={(e) => handleSelectBoxChange(e, newCategoryStatus?.toUpperCase() as CategoryType)}
          >
            {selectBox?.map((obj: any) => (
              <option key={obj.id} value={obj.name}>
                {obj.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>

      <FormControl id="money">
        <Input
          type="text"
          placeholder="Enter amount"
          value={incomeTransactionObj?.amount ? incomeTransactionObj.amount.toString() : '0'}
          onChange={handleAmountChange}
        />
      </FormControl>

      <FormControl id="description">
        <Input type="text" placeholder="Enter description" />
      </FormControl>
    </>
  )
}

export default TransactionForm