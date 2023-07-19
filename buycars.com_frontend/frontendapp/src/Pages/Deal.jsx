import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  useBreakpointValue,
  Button,
  Flex,
} from "@chakra-ui/react";
import { getOEM } from "../Redux/OEM/actionCreater";
import TableRow from "./../Components/TableRow";

const Deals = () => {
  const isTableFullWidth = useBreakpointValue({ base: true, md: false });
  const { token } = useSelector((store) => store.auth);
  const { oem_specs } = useSelector((store) => store.oem);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOEM(token));
    // console.log(oem_specs);
  }, []);

  return (
    <Box w={"100%"} overflowX="auto">
      <TableContainer>
        <Flex justifyContent={"space-between"}>
          <Button>Previous</Button>
          <Button>Next</Button>
        </Flex>
        <Table size={isTableFullWidth ? "md" : "sm"}>
          <TableCaption size="sm">OEM SPECIFICATIONS</TableCaption>

          <Thead>
            <Tr>
              <Th>Manufacturer</Th>
              <Th>Model</Th>
              <Th>Year of Launch</Th>
              <Th>Ex-showroom price</Th>
              <Th>Colors</Th>
              <Th>Mileage</Th>
              <Th>Max Speed(km/h)</Th>
              <Th>Power(BHP)</Th>
              <Th>Image</Th>
              <Th>Select</Th>
            </Tr>
          </Thead>
          <Tbody>
            {oem_specs?.map((el) => {
              return <TableRow el={el} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Deals;
