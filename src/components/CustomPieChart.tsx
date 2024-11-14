import { Text } from "@chakra-ui/react"
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend } from "recharts";

const rawData = [
  // { label: "", value: 0.0001, color: "pink" }
  { label: "Food", value: 400, color: "#0088FE" },
  { label: "Taxi", value: 300, color: "#00C49F" },
  { label: "Medicine", value: 300, color: "#FFBB28" },
  { label: "Entertainment", value: 200, color: "#FF8042" },
  { label: "Food", value: 150, color: "#0088FE" },
  { label: "Taxi", value: 100, color: "#00C49F" },
];

// Function to aggregate data by label
const aggregateData = (data) => {
  const aggregated = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.label === curr.label);
    if (existing) {
      existing.value += curr.value;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
  return aggregated;
};

const data = aggregateData(rawData);
const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

const CustomPieChart: React.FC = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeSum, setActiveSum] = useState<number | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseEnter = (data) => {
    setHovered(true);
    setActiveLabel(data.label);
    const totalSum = data.value;
    setActiveSum(totalSum);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setActiveLabel(null);
    setActiveSum(null);
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold">Expenses Chart</Text>
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
          label={({ label, value }) => {
            const percentage = ((value / totalValue) * 100).toFixed(2);
            return `${label}: (${percentage}%)`;
          }}
          dataKey="value"
          isAnimationActive={false}
          activeShape={null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
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
            {activeLabel && activeSum !== null ? activeSum : 0}
          </text>
        </>

      </PieChart>
    </>
  );
};

export default CustomPieChart;