import { motion } from "framer-motion";
import { AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import useBudgetTrackerStore from "../../store";
import IncomeForm from "./IncomeForm";
import TransferForm from "./TransferForm";
import ExpenseForm from "./ExpenseForm";
import { TutorialTargets } from "../../data/tourSteps";
import { fadeInVariants } from "../../animation";
import usePostTransaction from "../../hooks/http/usePostTransaction";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setTransactionObj({
      leftCategory: null,
      rightCategory: null,
      type: null,
      amount: 0,
      description: null,
      category_id: null,
      status: "FAILED",
      createdAt: new Date(),
    });
    setNewTransactionStatus(null);
    setLeftCategoryError(null);
    setRightCategoryError(null);
    setAmountError(null);
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <VStack spacing="1vw" width="100%" maxW="21vw">
          <Text fontSize="1.05vw" fontWeight="bold">
            Transactions
          </Text>
          {newTransactionStatus && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <VStack
                spacing="0.8vw"
                width="100%"
                maxW="21vw"
                p="0.8vw"
                borderWidth="1px"
                borderRadius="0.3vw"
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

                <HStack spacing="0.8vw" width="100%">
                  <Button
                    colorScheme="blue"
                    width="50%"
                    m={0}
                    p={0}
                    fontSize="0.83vw"
                    borderRadius="0.3vw"
                    isLoading={isLoading}
                    onClick={() => saveTransaction(setIsLoading)}
                  >
                    Save
                  </Button>
                  <Button
                    colorScheme="blue"
                    width="50%"
                    m={0}
                    p={0}
                    fontSize="0.83vw"
                    borderRadius="0.3vw"
                    variant="outline"
                    onClick={handleCancelTransaction}
                  >
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </motion.div>
          )}

          <HStack spacing="0.9vw">
            <Button
              id={TutorialTargets.IncomeTransactionButton}
              variant="solid"
              borderRadius="50%"
              border="0.28vw solid green"
              bgColor="#FFFFFF"
              color="green"
              width="6.5vw"
              height="6.25vw"
              padding={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              name={TransactionType.INCOME}
              onClick={(e) => addNewTransactionHandler(e)}
              isDisabled={newTransactionStatus !== null}
            >
              <AddIcon boxSize="1.6vw" />
            </Button>
            <Button
              id={TutorialTargets.TransferTransactionButton}
              variant="solid"
              borderRadius="25%"
              border="0.28vw solid gray"
              bgColor="#FFFFFF"
              color="gray"
              width="6.5vw"
              height="4.5vw"
              padding={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              name={TransactionType.TRANSFER}
              onClick={(e) => addNewTransactionHandler(e)}
              isDisabled={newTransactionStatus !== null}
            >
              <RepeatIcon boxSize="1.6vw" />
            </Button>
            <Button
              id={TutorialTargets.ExpenseTransactionButton}
              variant="solid"
              borderRadius="50%"
              border="0.28vw solid red"
              bgColor="#FFFFFF"
              color="red"
              width="6.5vw"
              height="6.25vw"
              padding={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              name={TransactionType.EXPENSE}
              onClick={(e) => addNewTransactionHandler(e)}
              isDisabled={newTransactionStatus !== null}
            >
              <MinusIcon boxSize="1.6vw" />
            </Button>
          </HStack>
        </VStack>
      </motion.div>
    </>
  );
};

export default Transactions;
