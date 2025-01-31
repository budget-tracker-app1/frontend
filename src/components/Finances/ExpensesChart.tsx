import { Text, VStack } from "@chakra-ui/react"
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend, PieLabelRenderProps } from "recharts";
import useTransactions from "../../hooks/general/useTransactions";
import { ITransactionWithColor } from "../Transactions";
import { TutorialTargets } from "../../data/tourSteps";

// Function to aggregate data by label
const aggregateData = (data: ITransactionWithColor[]) => {
  const aggregated = data.reduce((acc: ITransactionWithColor[], curr: ITransactionWithColor) => {
    const existing = acc.find((item: ITransactionWithColor) => item.rightCategory === curr.rightCategory);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
  return aggregated.map((item) => ({ ...item, value: item.amount }));
};

const ExpensesChart: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeSum, setActiveSum] = useState<number | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const { successfulExpenseTransactions } = useTransactions();

  const data = aggregateData(successfulExpenseTransactions);

  const totalValue = data.reduce((sum: number, entry: ITransactionWithColor) => {
    const balance = entry.amount ?? 0;
    return sum + balance;
  }, 0).toFixed(2);

  const handleMouseEnter = (data: ITransactionWithColor) => {
    setHovered(true);
    setActiveLabel(data.rightCategory);
    const totalSum = data.amount ?? 0;
    setActiveSum(totalSum);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setActiveLabel(null);
    setActiveSum(null);
  };

  return (
    <>
      <VStack spacing="1vw" width="100%" maxW="21vw">
        <Text
          id={TutorialTargets.ExpensesChartTitle}
          fontSize="1.05vw"
          fontWeight="bold"
          bgColor="#F1F1F1"
          borderRadius="0.25vw"
        >
          Expenses Chart
        </Text>
        {+totalValue &&
          <PieChart
            width={600}
            height={300}
          >
            <circle
              cx="50%"
              cy="50%"
              r={60}
              fill="#FFFFFF"
              style={{
                transition: "fill 0.3s ease-in-out",
                fill: hovered ? "grey" : "#FFFFFF",
              }}
            />

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              labelLine
              dataKey="amount"
              label={({ payload }: PieLabelRenderProps) => {
                if (!payload) return '';
                const percentage = ((payload.amount / +totalValue) * 100).toFixed(2);
                return `${payload.rightCategory}: (${percentage}%)`;
              }}
              isAnimationActive={false}
              activeShape={undefined}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry: ITransactionWithColor) => (
                <Cell
                  key={`cell-${entry.id}`}
                  fill={entry.color}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>
            <Legend />

            <>
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  fill: activeLabel && activeSum !== null ? "#FFFFFF" : "#000000",
                }}
              >
                {activeLabel && activeSum !== null ? activeLabel : "Total"}
              </text>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  fill: activeLabel && activeSum !== null ? "#FFFFFF" : "#000000",
                }}
              >
                {activeLabel && activeSum !== null ? activeSum.toFixed(2) : totalValue}
              </text>
            </>

          </PieChart>
        }
      </VStack>
    </>
  );
};

export default ExpensesChart;