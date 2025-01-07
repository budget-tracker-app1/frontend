import { Box, Button, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { ITransactionWithColor, TransactionType } from "../Transactions";

interface GroupProps {
  category: string;
  transactions: ITransactionWithColor[];
  type: TransactionType;
}

const Group: FC<GroupProps> = ({ category, transactions, type }) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

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
        pt="0.25vw"
        pb="0.25vw"
        pl="0.7vw"
        bg="gray.300"
        borderRadius="0.25vw"
        cursor="pointer"
        onClick={() => toggleCategory(category)}
      >
        <Text
          fontSize="0.8vw"
          fontWeight="bold"
          color={type === TransactionType.INCOME ? "green.500" : "red.400"}
        >
          {category}
        </Text>
        <HStack gap={0}>
          <Text fontSize="0.8vw" fontWeight="bold">
            {total.toFixed(2)} $
          </Text>
          <Button
            width="0.8vw"
            minW={0}
            height="0.8vw"
            bgColor="transparent"
            fontSize="0.65vw"
          >
            {expandedCategories[category] ? "▲" : "▼"}
          </Button>
        </HStack>
      </HStack>
      <Collapse in={expandedCategories[category]} animateOpacity>
        <VStack spacing="0.4vw" align="start" mt="0.4vw" mb="0.4vw">
          {transactions.map((transaction) => (
            <HStack
              key={transaction.id}
              width="100%"
              justifyContent="space-between"
              bg={type === TransactionType.INCOME ? "green.50" : "red.50"}
              p="0.35vw"
              pl="1vw"
              borderRadius="0.3vw"
            >
              <Text fontSize="0.7vw">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(transaction.createdAt))}
              </Text>
              <Text
                fontSize="0.7vw"
                color={
                  type === TransactionType.INCOME ? "green.500" : "red.400"
                }
              >
                {type === TransactionType.INCOME ? "+" : "-"}{" "}
                {transaction.amount.toFixed(2)} $
              </Text>
            </HStack>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default Group;
