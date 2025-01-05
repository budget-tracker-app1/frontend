import { motion } from "framer-motion";
import React from "react";
import { Box, VStack, Text, Badge, Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import useSortableData from "../../hooks/general/useSortableData";
import { ITransaction } from "../Transactions";
import { TutorialTargets } from "../../data/tourSteps";
import useFetchAllCategories from "../../hooks/http/useFetchAllCategories";
import useFetchAllTransactions from "../../hooks/http/useFetchAllTransactions";
import { fadeInVariants } from "../../animation";

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

  const { isCategoriesLoading } = useFetchAllCategories();
  const { isTransactionsLoading } = useFetchAllTransactions();

  const getSuccessMessage = (transaction: any): string => {
    if (transaction.type === "INCOME") {
      return `$${transaction.amount.toFixed(2)} earned from ${
        transaction.rightCategory
      } into ${transaction.leftCategory} account.`;
    }
    if (transaction.type === "EXPENSE") {
      return `$${transaction.amount.toFixed(2)} spent to ${
        transaction.rightCategory
      } from ${transaction.leftCategory} account.`;
    }
    if (transaction.type === "TRANSFER") {
      return `$${transaction.amount.toFixed(2)} transferred from ${
        transaction.leftCategory
      } to ${transaction.rightCategory} account.`;
    }
    return "Unknown transaction type";
  };

  const getFailedMessage = (transaction: any): string => {
    if (transaction.type === "EXPENSE") {
      return `Insufficient balance. $${transaction.amount.toFixed(
        2
      )} tried to spend to ${transaction.rightCategory} from ${
        transaction.leftCategory
      } account.`;
    }
    if (transaction.type === "TRANSFER") {
      return `Insufficient balance. $${transaction.amount.toFixed(
        2
      )} tried to transfer from ${transaction.leftCategory} to ${
        transaction.rightCategory
      } account.`;
    }
    return "Transaction failed";
  };

  return (
    <VStack align="center" gap="1rem" width="full" pr={4} pl={4}>
      <Text fontSize="xl" fontWeight="bold" mb="-0.5rem">
        History
      </Text>
      {!isCategoriesLoading && !isTransactionsLoading ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem"
          }}
        >
          <Flex justify="center" mb={4} gap={4}>
            <Box
              id={TutorialTargets.SortButtonGroup}
              display="flex"
              flexDir="row"
              gap={4}
              borderRadius="8px"
            >
              <Button
                onClick={() => handleColumnClick(Column.TYPE)}
                rightIcon={renderSortIcon(Column.TYPE)}
              >
                Sort by Type
              </Button>
              <Button
                onClick={() => handleColumnClick(Column.STATUS)}
                rightIcon={renderSortIcon(Column.STATUS)}
              >
                Sort by Status
              </Button>
              <Button
                onClick={() => handleColumnClick(Column.DATE)}
                rightIcon={renderSortIcon(Column.DATE)}
              >
                Sort by Date
              </Button>
            </Box>
            <Button
              id={TutorialTargets.ResetAllSortingButton}
              onClick={() => cancelSorting()}
              rightIcon={
                sortingCriteria.length > 0 ? <RepeatIcon /> : undefined
              }
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

              {each.description && (
                <Text color="gray.700" fontSize="sm" mt={2}>
                  Description: {each.description}
                </Text>
              )}
            </Box>
          ))}
        </motion.div>
      ) : (
        <Text>Loading...</Text>
      )}
    </VStack>
  );
};

export default History;
