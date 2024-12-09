import { FormControl, FormLabel, HStack, Input, Select } from "@chakra-ui/react"
import React from 'react'
import useBudgetTrackerStore from "../../store";
import useCategories from "../../hooks/general/useCategories";
import { ITransaction } from ".";

const ExpenseForm = () => {
  const { newTransactionStatus, transactionObj, setTransactionObj } = useBudgetTrackerStore();
  const { accountCategories, expenseCategories } = useCategories();

  const handleSelectBoxChange = (e: React.ChangeEvent<HTMLSelectElement>, index: string) => {
    const { value } = e.target;
    
    if (index === "first") {
      const categoryId = accountCategories.find(category => category.name === value)?.id;
      setTransactionObj({
        ...transactionObj as ITransaction,
        leftCategory: value,
        category_id: categoryId,
      });
    }
    if (index === "second") {
      setTransactionObj({
        ...transactionObj as ITransaction,
        rightCategory: value,
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

    setTransactionObj({
      ...transactionObj as ITransaction,
      amount: parseFloat(input) || 0,
    });
  };

  return (
    <>
      <FormLabel>New {newTransactionStatus?.toLowerCase()}</FormLabel>
      <HStack spacing={4} width="100%">
        <FormControl id="account">
          <Select
            placeholder={"Select account"}
            onChange={(e) => handleSelectBoxChange(e, "first")}
          >
            {accountCategories?.map((account: any) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="income">
          <Select
            placeholder={"Select expense source"}
            onChange={(e) => handleSelectBoxChange(e, "second")}
          >
            {expenseCategories?.map((income: any) => (
              <option key={income.id} value={income.name}>
                {income.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>

      <FormControl id="money">
        <Input
          type="text"
          placeholder="Enter amount"
          value={transactionObj?.amount ? transactionObj.amount.toString() : '0'}
          onChange={handleAmountChange}
        />
      </FormControl>

      <FormControl id="description">
        <Input type="text" placeholder="Enter description" />
      </FormControl>
    </>
  )
}

export default ExpenseForm