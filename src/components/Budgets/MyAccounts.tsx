import { motion } from "framer-motion";
import { HStack, Text, VStack } from "@chakra-ui/react"
import React from 'react'
import useCategories from "../../hooks/general/useCategories";
import { TutorialTargets } from "../../data/tourSteps";
import { fadeInVariants } from "../../animation";

const MyAccounts = () => {
  const { accountCategories } = useCategories();

  const totalBalance = accountCategories?.reduce((sum, account) => sum + (account.balance ?? 0), 0);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <VStack spacing={4} width="100%" maxW="400px">
          <Text fontSize="xl" fontWeight="bold">My accounts</Text>
          {accountCategories?.map((account) => (
            <HStack
              key={account.id}
              width="100%"
              justifyContent="space-between"
              p={3}
              bg="gray.100"
              borderRadius="md"
            >
              <Text fontSize="md">{account.name}</Text>
              <Text fontSize="md" fontWeight="bold">{account.balance?.toFixed(2)} $</Text>
            </HStack>
          ))}
          <HStack
            id={TutorialTargets.TotalBalance}
            width="100%"
            justifyContent="space-between"
            p={3}
            bg="green.400"
            color="white"
            borderRadius="md"
          >
            <Text fontSize="md" fontWeight="bold">Total balance</Text>
            <Text fontSize="md" fontWeight="bold">{totalBalance?.toFixed(2)} $</Text>
          </HStack>
        </VStack>
      </motion.div>
    </>
  )
}

export default MyAccounts