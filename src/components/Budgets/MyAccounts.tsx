import { motion } from "framer-motion";
import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useCategories from "../../hooks/general/useCategories";
import { TutorialTargets } from "../../data/tourSteps";
import { fadeInVariants } from "../../animation";

const MyAccounts = () => {
  const { accountCategories } = useCategories();

  const totalBalance = accountCategories?.reduce(
    (sum, account) => sum + (account.balance ?? 0),
    0
  );

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <VStack spacing="0.8vw" width="100%" maxW="21vw" maxHeight="20.5vw" overflow="auto">
          <Text fontSize="1.05vw" fontWeight="bold">
            My accounts
          </Text>
          {accountCategories?.map((account) => (
            <HStack
              key={account.id}
              width="100%"
              justifyContent="space-between"
              p="0.64vw"
              bg="gray.100"
              borderRadius="0.35vw"
            >
              <Text fontSize="0.83vw">{account.name}</Text>
              <Text fontSize="0.83vw" fontWeight="bold">
                {account.balance?.toFixed(2)} $
              </Text>
            </HStack>
          ))}
          <HStack
            id={TutorialTargets.TotalBalance}
            width="100%"
            justifyContent="space-between"
            p="0.64vw"
            bg="green.400"
            color="white"
            borderRadius="0.35vw"
          >
            <Text fontSize="0.83vw" fontWeight="bold">
              Total balance
            </Text>
            <Text fontSize="0.83vw" fontWeight="bold">
              {totalBalance?.toFixed(2)} $
            </Text>
          </HStack>
        </VStack>
      </motion.div>
    </>
  );
};

export default MyAccounts;
