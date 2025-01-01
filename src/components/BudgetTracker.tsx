import React, { useEffect, useState } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import useGetAllCategories from "../hooks/http/useGetAllCategories";
import Categories from "./Categories";
import Budgets from "./Budgets";
import useGetAllTransactions from "../hooks/http/useGetAllTransactions";
import History from "./History";
import Finances from "./Finances";
import TooltipOverlay from "./TooltipOverlay";
import { steps } from "../data/tourSteps";
import Tutorial from "./Modal/Tutorial";
import useBudgetTrackerStore from "../store";

const BudgetTracker: React.FC = () => {
  const { getAllCategories } = useGetAllCategories();
  const { getAllTransactions } = useGetAllTransactions();
  const { startTutorial } = useBudgetTrackerStore()

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(steps.length);
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length);
  };

  return (
    <>
      <VStack spacing={4}>
        <Flex gap={4} justify="center" width="100%" height="48vh">
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minW="200px"
            overflow="auto"
            bgColor="lightgoldenrodyellow"
          >
            <Categories />
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minW="200px"
            overflow="auto"
            bgColor="#F1F1F1"
          >
            <Finances />
          </Box>
        </Flex>

        <Flex gap={4} justify="center" width="100%" height="48vh">
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minW="200px"
            overflow="auto"
            bgColor="lightgray"
          >
            <Budgets />
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minW="200px"
            overflow="auto"
            bgColor="lightskyblue"
          >
            <History />
          </Box>
        </Flex>
      </VStack>

      {startTutorial && currentStep < steps.length && (
        <TooltipOverlay
          currentStep={currentStep}
          steps={steps}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}

      {<Tutorial />}
    </>
  );
};

export default BudgetTracker;
