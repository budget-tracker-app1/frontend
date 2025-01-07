import { motion } from "framer-motion";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import useTransactions from "../../hooks/general/useTransactions";
import { ITransactionWithColor, TransactionType } from "../Transactions";
import Group from "./Group";
import { TutorialTargets } from "../../data/tourSteps";
import { fadeInVariants } from "../../animation";

const Cashflow = () => {
  const { successfulIncomeTransactions, successfulExpenseTransactions } =
    useTransactions();

  const groupTransactionsByCategory = (
    transactions: ITransactionWithColor[]
  ) => {
    // Group transactions by `rightCategory`
    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const category = transaction.rightCategory || ""; // Fallback for null/undefined
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(transaction); // Add transaction to the respective category group
      return acc;
    }, {} as Record<string, ITransactionWithColor[]>);

    // Sort categories by total amount (descending order)
    const sortedCategories = Object.entries(groupedTransactions)
      .map(([category, transactions]) => ({
        category,
        transactions,
        totalAmount: transactions.reduce((sum, t) => sum + (t.amount || 0), 0), // Safe fallback for null/undefined
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount); // Sort by total amount, descending

    return sortedCategories; // Return sorted array of category objects
  };

  // Group income and expense transactions separately
  const groupedIncomeTransactions = groupTransactionsByCategory(
    successfulIncomeTransactions
  );
  const groupedExpenseTransactions = groupTransactionsByCategory(
    successfulExpenseTransactions
  );

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <VStack width="100%" maxW="21vw" gap={0}>
          <Text
            id={TutorialTargets.CashflowTitle}
            fontSize="1.05vw"
            fontWeight="bold"
            mb="0.9vw"
            bgColor="#F1F1F1"
            borderRadius="0.25vw"
          >
            Cashflow
          </Text>
          {groupedIncomeTransactions.map(({ category, transactions }) => (
            <Group
              key={category}
              category={category}
              transactions={transactions}
              type={TransactionType.INCOME}
            />
          ))}
          {groupedExpenseTransactions.map(({ category, transactions }) => (
            <Group
              key={category}
              category={category}
              transactions={transactions}
              type={TransactionType.EXPENSE}
            />
          ))}
        </VStack>
      </motion.div>
    </>
  );
};

export default Cashflow;
