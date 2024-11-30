import { AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons"
import { Button, HStack, Text, VStack } from "@chakra-ui/react"
import React from 'react'
import useBudgetTrackerStore from "../../store";
import usePostIncome from "../../hooks/http/usePostIncome";
import TransactionForm from "./TransactionForm";
import useCategories from "../../hooks/general/useCategories";

export enum TransactionType {
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
  EXPENSE = "EXPENSE",
}

export interface IIncomeTransaction {
  account: string;
  income: string;
  amount: number;
  description: string | null;
  category_id: number | null;
}

export interface IExpenseTransaction {
  account: string;
  expense: string;
  amount: number;
  description: string | null;
  category_id: number | null;
}

export interface ITransferTransaction {
  from_account: string;
  to_account: string;
  amount: number;
  description: string | null;
  category_id: number | null;
}

const Transactions = () => {
  const { newTransactionStatus, setNewTransactionStatus } = useBudgetTrackerStore();
  const { accountCategories, incomeCategories, expenseCategories } = useCategories();
  const { saveIncomeTransaction } = usePostIncome();

  const addNewTransactionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newTransactionStatus) {
      setNewTransactionStatus(e.currentTarget.name as TransactionType);
    }
  }

  return (
    <>
      <VStack spacing={4} width="100%" maxW="400px">
        <Text fontSize="xl" fontWeight="bold">Transactions</Text>
        {newTransactionStatus &&
        <VStack
          spacing={4}
          width="100%"
          maxW="400px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          bgColor="#FFFFFF"
        >
          <TransactionForm
            firstPlaceholder={newTransactionStatus === TransactionType.TRANSFER ? "From account" : "Select account"}
            secondPlaceholder={newTransactionStatus === TransactionType.INCOME ? "Select income source" : newTransactionStatus === TransactionType.TRANSFER ? "To account" : newTransactionStatus === TransactionType.EXPENSE ? "Select expense source" : ""}
            selectBox={newTransactionStatus === TransactionType.TRANSFER ? accountCategories : newTransactionStatus === TransactionType.INCOME ? incomeCategories : newTransactionStatus === TransactionType.EXPENSE ? expenseCategories : []}
          />

          <HStack spacing={4} width="100%">
            <Button
              colorScheme="blue"
              width="50%"
              onClick={() => saveIncomeTransaction()}
              // onClick={() => console.log(incomeTransactionObj)}
            >
              Save
            </Button>
            <Button
              colorScheme="blue"
              width="50%"
              variant="outline"
              onClick={() => setNewTransactionStatus(null)}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>}

        <HStack spacing={4}>
          <Button
            variant="solid"
            borderRadius="50%"
            border="5px solid green"
            bgColor="#FFFFFF"
            color="green"
            width="120px"
            height="120px"
            padding={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            name={TransactionType.INCOME}
            onClick={(e) => addNewTransactionHandler(e)}
            isDisabled={newTransactionStatus !== null}
          >
            <AddIcon boxSize={8} />
          </Button>
          <Button
            variant="solid"
            borderRadius="25%"
            border="5px solid gray"
            bgColor="#FFFFFF"
            color="gray"
            width="120px"
            height="90px"
            padding={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            name={TransactionType.TRANSFER}
            onClick={(e) => addNewTransactionHandler(e)}
            isDisabled={newTransactionStatus !== null}
          >
            <RepeatIcon boxSize={8} />
          </Button>
          <Button
            variant="solid"
            borderRadius="50%"
            border="5px solid red"
            bgColor="#FFFFFF"
            color="red"
            width="120px"
            height="120px"
            padding={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            name={TransactionType.EXPENSE}
            onClick={(e) => addNewTransactionHandler(e)}
            isDisabled={newTransactionStatus !== null}
          >
            <MinusIcon boxSize={8} />
          </Button>
        </HStack>
      </VStack>
    </>
  )
}

export default Transactions