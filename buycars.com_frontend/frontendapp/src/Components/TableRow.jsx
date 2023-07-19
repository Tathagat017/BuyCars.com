import React from "react";

import { Tr, Td, Image, Button } from "@chakra-ui/react";
import ColorSquares from "./SquareBoxes";

const TableRow = ({ el }) => {
  return (
    <Tr>
      <Td>{el.vehicle_oem_name}</Td>
      <Td>{el.vehicle_model_name}</Td>
      <Td>{el.year_of_launch}</Td>
      <Td>{el.vehicle_ex_showroom_price}</Td>
      <Td>
        {
          <ColorSquares
            colors={el.vehicle_available_colors}
            numberOfBoxes={el.vehicle_available_colors.length}
          />
        }
      </Td>
      <Td>{el.vehicle_mileage}</Td>
      <Td>{el.vehicle_max_speed}</Td>
      <Td>{el.vehicle_power}</Td>
      <Td>
        <Image src={el.image}></Image>
      </Td>
      <Button>Select</Button>
    </Tr>
  );
};

export default TableRow;
