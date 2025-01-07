import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useBudgetTrackerStore from "../../store";
import useCategories from "../../hooks/general/useCategories";
import { ITransaction } from ".";

const IncomeForm = () => {
  const {
    newTransactionStatus,
    transactionObj,
    setTransactionObj,
    leftCategoryError,
    rightCategoryError,
    amountError
  } = useBudgetTrackerStore();
  const { accountCategories, incomeCategories } = useCategories();

  const handleSelectBoxChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: string
  ) => {
    const { value } = e.target;

    if (index === "first") {
      const categoryId =
        accountCategories?.find((category) => category.name === value)?.id ??
        null;
      setTransactionObj({
        ...(transactionObj as ITransaction),
        leftCategory: value,
        category_id: categoryId,
      });
    }
    if (index === "second") {
      setTransactionObj({
        ...(transactionObj as ITransaction),
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
      ...(transactionObj as ITransaction),
      amount: parseFloat(input) || 0,
    });
  };

  return (
    <>
      <FormLabel>New {newTransactionStatus?.toLowerCase()}</FormLabel>
      <HStack spacing="0.9vw" width="100%">
        <FormControl id="account">
          <Select
            placeholder={"Select account"}
            onChange={(e) => handleSelectBoxChange(e, "first")}
            borderColor={leftCategoryError ? "red.500" : undefined}
          >
            {accountCategories?.map((account: any) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </Select>
          {leftCategoryError && (
            <Text color="red.500" fontSize="0.7vw" mb={"-0.75vw"}>
              {leftCategoryError}
            </Text>
          )}
        </FormControl>

        <FormControl id="income">
          <Select
            placeholder={"Select income source"}
            onChange={(e) => handleSelectBoxChange(e, "second")}
            borderColor={rightCategoryError ? "red.500" : undefined}
          >
            {incomeCategories?.map((income: any) => (
              <option key={income.id} value={income.name}>
                {income.name}
              </option>
            ))}
          </Select>
          {rightCategoryError && (
            <Text color="red.500" fontSize="0.7vw" mb={"-0.75vw"}>
              {rightCategoryError}
            </Text>
          )}
        </FormControl>
      </HStack>

      <FormControl id="money">
        <Input
          type="text"
          placeholder="Enter amount"
          borderColor={amountError ? "red.500" : undefined}
          value={
            transactionObj?.amount ? transactionObj.amount.toString() : "0"
          }
          onChange={handleAmountChange}
        />
        {amountError && (
          <Text color="red.500" fontSize="0.7vw" mb={"-0.75vw"}>
            {amountError}
          </Text>
        )}
      </FormControl>

      <FormControl id="description">
        <Input type="text" placeholder="Enter description" />
      </FormControl>
    </>
  );
};

export default IncomeForm;
