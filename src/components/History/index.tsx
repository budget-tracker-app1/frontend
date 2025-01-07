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
    <VStack align="center" gap="1vw" width="full" pr="1vw" pl="1vw">
      <Text fontSize="1.05vw" fontWeight="bold" mb="-0.5vw">
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
            gap: "0.8vw",
          }}
        >
          <Flex justify="center" mb="0.2vw" gap="1vw">
            <Box
              id={TutorialTargets.SortButtonGroup}
              display="flex"
              flexDir="row"
              gap="0.8vw"
              borderRadius="0.3vw"
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
              p="0.8vw"
              shadow="sm"
              borderWidth="1px"
              borderRadius="0.3vw"
              bg="white"
            >
              <Flex justify="space-between" align="center" mb="0.4vw">
                <Badge
                  colorScheme="gray"
                  fontSize="0.83vw"
                  px="0.62vw"
                  py="0.24vw"
                  borderRadius="0.3vw"
                >
                  {each.type}
                </Badge>
                <Text color="gray.600" fontSize="0.7vw">
                  Date: {new Date(each.createdAt).toLocaleDateString("en-GB")}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center" mb="0.35vw">
                <Badge
                  colorScheme={each.status === "SUCCESS" ? "green" : "red"}
                  px="0.45vw"
                  borderRadius="0.3vw"
                >
                  {each.status}
                </Badge>
                <Text fontWeight="bold" fontSize="0.84vw" textAlign="right">
                  {each.status === "SUCCESS"
                    ? getSuccessMessage(each)
                    : getFailedMessage(each)}
                </Text>
              </Flex>

              {each.description && (
                <Text color="gray.700" fontSize="0.74vw" mt="0.4vw">
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
