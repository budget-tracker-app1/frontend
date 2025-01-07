import { motion } from "framer-motion";
import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import Cashflow from "./Cashflow";
import ExpensesChart from "./ExpensesChart";
import useFetchAllCategories from "../../hooks/http/useFetchAllCategories";
import useFetchAllTransactions from "../../hooks/http/useFetchAllTransactions";
import { fadeInVariants } from "../../animation";

const Finances = () => {
  const { isCategoriesLoading } = useFetchAllCategories();
  const { isTransactionsLoading } = useFetchAllTransactions();

  return (
    <>
      <Text fontSize="1.1vw" fontWeight="bold">
        Finances
      </Text>
      {!isCategoriesLoading && !isTransactionsLoading ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <HStack
            spacing="2vw"
            width="100%"
            maxW="46.88vw"
            margin="0 auto"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <ExpensesChart />
            <Cashflow />
          </HStack>
        </motion.div>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default Finances;
