import React from "react";
import { Box, VStack, Text, Badge, Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import useSortableData from "../../hooks/general/useSortableData";
import { ITransaction } from "../Transactions";

enum Column {
  TYPE = "type",
  STATUS = "status",
  DATE = "createdAt",
}

const History: React.FC = () => {
  const {
    sortedData,
    sortingCriteria,
    handleColumnClick,
    renderSortIcon,
    cancelSorting,
  } = useSortableData<ITransaction>();

  const getSuccessMessage = (transaction: any): string => {
    if (transaction.type === "INCOME") {
      return `$${transaction.amount.toFixed(
        2
      )} earned from ${transaction.rightCategory} into ${transaction.leftCategory} account.`;
    }
    if (transaction.type === "EXPENSE") {
      return `$${transaction.amount.toFixed(
        2
      )} spent to ${transaction.rightCategory} from ${transaction.leftCategory} account.`;
    }
    if (transaction.type === "TRANSFER") {
      return `$${transaction.amount.toFixed(
        2
      )} transferred from ${transaction.leftCategory} to ${transaction.rightCategory} account.`;
    }
    return "Unknown transaction type";
  };
  
  const getFailedMessage = (transaction: any): string => {
    if (transaction.type === "EXPENSE") {
      return `Insufficient balance. $${transaction.amount.toFixed(
        2
      )} tried to spend to ${transaction.rightCategory} from ${transaction.leftCategory} account.`;
    }
    if (transaction.type === "TRANSFER") {
      return `Insufficient balance. $${transaction.amount.toFixed(
        2
      )} tried to transfer from ${transaction.leftCategory} to ${transaction.rightCategory} account.`;
    }
    return "Transaction failed";
  };

  return (
    <VStack
      align="center"
      gap="1rem"
      width="full"
      pr={4}
      pl={4}
    >
      <Text fontSize="xl" fontWeight="bold">History</Text>
      <Flex justify="space-between" mb={4} gap={4}>
        <Button onClick={() => handleColumnClick(Column.TYPE)} rightIcon={renderSortIcon(Column.TYPE)}>
          Sort by Type
        </Button>
        <Button onClick={() => handleColumnClick(Column.STATUS)} rightIcon={renderSortIcon(Column.STATUS)}>
          Sort by Status
        </Button>
        <Button onClick={() => handleColumnClick(Column.DATE)} rightIcon={renderSortIcon(Column.DATE)}>
          Sort by Date
        </Button>
        <Button
          onClick={() => cancelSorting()}
          rightIcon={sortingCriteria.length > 0 ? <RepeatIcon /> : undefined}
          isDisabled={sortingCriteria.length === 0}
        >
          Reset all sorting
        </Button>
      </Flex>
      {sortedData.map((each) => (
        <Box
          key={each.id}
          width="full"
          p={4}
          shadow="sm"
          borderWidth="1px"
          borderRadius="md"
          bg="white"
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Badge
              colorScheme="gray"
              fontSize="md"
              px={3}
              py={1}
              borderRadius="md"
            >
              {each.type}
            </Badge>
            <Text color="gray.600" fontSize="sm">
              Date: {new Date(each.createdAt).toLocaleDateString("en-GB")}
            </Text>
          </Flex>

          <Flex justify="space-between" align="center" mb={2}>
            <Badge
              colorScheme={each.status === "SUCCESS" ? "green" : "red"}
              px={2}
              borderRadius="md"
            >
              {each.status}
            </Badge>
            <Text fontWeight="bold" fontSize="md" textAlign="right">
              {each.status === "SUCCESS"
                ? getSuccessMessage(each)
                : getFailedMessage(each)}
            </Text>
          </Flex>

          {each.description && <Text color="gray.700" fontSize="sm" mt={2}>
            Description: {each.description}
          </Text>}
        </Box>
      ))}
    </VStack>
  );
};

export default History;
