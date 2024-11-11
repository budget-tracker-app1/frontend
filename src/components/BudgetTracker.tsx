import React, { useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import useBudgetTrackerStore from '../store';
import useGetAllCategories from "../hooks/useGetAllCategories";

const BudgetTracker: React.FC = () => {
  const { getAllCategories } = useGetAllCategories();
  const { categories, budgets, transactions } = useBudgetTrackerStore();

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <VStack spacing={4}>
      <Box>
        <Text fontSize="xl" fontWeight="bold">Categories</Text>
        {categories.map(category => (
          <Text key={category.category_id}>{category.name}</Text>
        ))}
      </Box>
      <Box>
        <Text fontSize="xl" fontWeight="bold">Budgets</Text>
        {budgets.map(budget => (
          <Text key={budget.budget_id}>Amount: {budget.amount} for {budget.year}-{budget.month}</Text>
        ))}
      </Box>
      <Box>
        <Text fontSize="xl" fontWeight="bold">Transactions</Text>
        {transactions.map(transaction => (
          <Text key={transaction.transaction_id}>Transaction: {transaction.amount} on {transaction.date}</Text>
        ))}
      </Box>
    </VStack>
  );
};

export default BudgetTracker;
