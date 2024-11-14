import { Box, Wrap, WrapItem } from "@chakra-ui/react"
import React, { useEffect } from 'react'
import useBudgetTrackerStore from "../../store";

const ColorBlocks = () => {
  const { categoryObj, setCategoryObj } = useBudgetTrackerStore();

  const colors = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#4D4DFF", "#29A19C", "#FFD700", "#FFA07A",
    "#6A5ACD", "#20B2AA", "#D2691E", "#FFA500",
    "#32CD32", "#87CEEB", "#FF6666", "#8A2BE2",
    "#DB7093", "#66CDAA", "#BDB76B", "#A52A2A"
  ];

  useEffect(() => {
    setCategoryObj({
      ...categoryObj,
      color: colors[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickColorHandler = (color: string) => {
    setCategoryObj({
      ...categoryObj,
      color: color,
    });
  }

  return (
    <>
      <Wrap spacing={2} w="100%" maxW="100%" justify="center">
        {colors.map((color) => (
          <WrapItem key={color}>
            <Box
              key={color}
              w="20px"
              h="20px"
              bg={color}
              borderRadius="4px"
              cursor="pointer"
              border={categoryObj?.color === color ? "3px solid black" : "2px solid transparent"}
              onClick={() => pickColorHandler(color)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}

export default ColorBlocks