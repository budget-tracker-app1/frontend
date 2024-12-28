import { Box, Button, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from 'react'
import { ITransactionWithColor, TransactionType } from "../Transactions";

interface GroupProps {
  category: string;
  transactions: ITransactionWithColor[];
  type: TransactionType;
}

const Group: FC<GroupProps> = ({ category, transactions, type }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev: any) => ({
      ...prev,
      [category]: !prev[category], // Toggle the dropdown state for this category
    }));
  };
  
  const total = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <Box key={category} width="100%">
      <HStack
        width="100%"
        justifyContent="space-between"
        pt={1}
        pb={1}
        pl={3}
        pr={3}
        bg="gray.300"
        borderRadius="md"
        cursor="pointer"
        onClick={() => toggleCategory(category)}
      >
        <Text fontSize="md" fontWeight="bold" color={type === TransactionType.INCOME ? "green.500" : "red.400"}>{category}</Text>
        <HStack>
          <Text fontSize="md" fontWeight="bold">{total.toFixed(2)} $</Text>
          <Button size="xs" bgColor="transparent">
            {expandedCategories[category] ? "▲" : "▼"}
          </Button>
        </HStack>
      </HStack>
      <Collapse in={expandedCategories[category]} animateOpacity>
        <VStack spacing={2} align="start" mt={2} pl={4}>
          {transactions.map((transaction) => (
            <HStack
              key={transaction.id}
              width="100%"
              justifyContent="space-between"
              bg={type === TransactionType.INCOME ? "green.50" : "red.50"}
              p={2}
              borderRadius="md"
            >
              <Text fontSize="sm">
                {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(
                  new Date(transaction.createdAt)
                )}
              </Text>
              <Text fontSize="sm" color={type === TransactionType.INCOME ? "green.500" : "red.400"}>{type === TransactionType.INCOME ? "+" : "-"} {transaction.amount.toFixed(2)} $</Text>
            </HStack>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
}

export default Group