import React, { useEffect } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { ThemeProvider, createTheme } from "@mui/material";
import useGetAllCategories from "../hooks/useGetAllCategories";
import Categories from "./Categories";
import CustomPieChart from "./CustomPieChart";

const theme = createTheme();

const BudgetTracker: React.FC = () => {
  const { getAllCategories } = useGetAllCategories();

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
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
        <ThemeProvider theme={theme}>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            minW="200px"
            bgColor="#F1F1F1"
            overflow="auto"
          >
            <CustomPieChart />
          </Box>
        </ThemeProvider>
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
          <Text fontSize="xl" fontWeight="bold">
            Budgets
          </Text>
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
          <Text fontSize="xl" fontWeight="bold">
            Transactions
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
};

export default BudgetTracker;
