import { AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useBudgetTrackerStore from "../../store";
import IncomeForm from "./IncomeForm";
import TransferForm from "./TransferForm";
import ExpenseForm from "./ExpenseForm";
import usePostTransaction from "../../hooks/http/usePostTransaction";
import { TutorialTargets } from "../../data/tourSteps";

export enum TransactionType {
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
  EXPENSE = "EXPENSE",
}

export interface ITransaction {
  id?: number;
  leftCategory: string | null;
  rightCategory: string | null;
  type: TransactionType | null;
  amount: number;
  description: string | null;
  category_id: number | null;
  status: "SUCCESS" | "FAILED";
  createdAt: Date;
  user_id?: number;
}

export interface ITransactionWithColor extends ITransaction {
  color?: string;
}

const Transactions = () => {
  const {
    newTransactionStatus,
    setNewTransactionStatus,
    transactionObj,
    setTransactionObj,
    setLeftCategoryError,
    setRightCategoryError,
    setAmountError,
  } = useBudgetTrackerStore();
  const { saveTransaction } = usePostTransaction();

  const addNewTransactionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newTransactionStatus) {
      setNewTransactionStatus(e.currentTarget.name as TransactionType);
      setTransactionObj({
        ...transactionObj,
        type: e.currentTarget.name as TransactionType,
      });
    }
  };

  const handleCancelTransaction = () => {
    setNewTransactionStatus(null);
    setLeftCategoryError(null);
    setRightCategoryError(null);
    setAmountError(null);
  };

  return (
    <>
      <VStack spacing={4} width="100%" maxW="400px">
        <Text fontSize="xl" fontWeight="bold">
          Transactions
        </Text>
        {newTransactionStatus && (
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
            {newTransactionStatus === TransactionType.INCOME ? (
              <IncomeForm />
            ) : newTransactionStatus === TransactionType.TRANSFER ? (
              <TransferForm />
            ) : newTransactionStatus === TransactionType.EXPENSE ? (
              <ExpenseForm />
            ) : null}

            <HStack spacing={4} width="100%">
              <Button
                colorScheme="blue"
                width="50%"
                onClick={() => saveTransaction()}
              >
                Save
              </Button>
              <Button
                colorScheme="blue"
                width="50%"
                variant="outline"
                onClick={handleCancelTransaction}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        )}

        <HStack spacing={4}>
          <Button
            id={TutorialTargets.IncomeTransactionButton}
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
            id={TutorialTargets.TransferTransactionButton}
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
            id={TutorialTargets.ExpenseTransactionButton}
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
  );
};

export default Transactions;
