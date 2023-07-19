import React from "react";
import { Box } from "@chakra-ui/react";

const ColorSquares = ({ numberOfBoxes, colors }) => {
  const renderColorSquares = () => {
    return colors
      .slice(0, numberOfBoxes)
      .map((color, index) => (
        <Box
          key={index}
          w="20px"
          h="20px"
          bg={color}
          borderRadius="md"
          mx={1}
        />
      ));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {renderColorSquares()}
    </Box>
  );
};

export default ColorSquares;
