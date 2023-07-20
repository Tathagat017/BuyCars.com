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
  Input,
} from "@chakra-ui/react";
import { getOEM } from "../Redux/OEM/actionCreater";
import TableRow from "./../Components/TableRow";
import useDebounce from "../CutomHooks/UseThrottle";

const Deals = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const isTableFullWidth = useBreakpointValue({ base: true, md: false });
  const { token } = useSelector((store) => store.auth);
  const { oem_specs } = useSelector((store) => store.oem);
  const dispatch = useDispatch();
  //const [searchTerm, lastExecutedTime] = useDebounce(search, 200);
  useEffect(() => {
    dispatch(getOEM(token, page));
    console.log(oem_specs);
  }, [page]);

  const handlePageNext = (page) => {
    setPage((page) => page + 1);
  };

  const handlePagePrev = (page) => {
    setPage((page) => page - 1);
  };

  const handleSearch = () => {
    dispatch(getOEM(token, page, search));
  };

  return (
    <Box w={"100%"} overflowX="auto">
      <TableContainer>
        <Flex justifyContent={"space-evenly"}>
          <Button onClick={handlePagePrev}>Previous</Button>
          <Input
            name="search"
            placeholder="search model/Manufacturer/Year"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
          <Button onClick={handleSearch}>Search</Button>
          <Button onClick={handlePageNext}>Next</Button>
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
              return <TableRow el={el} key={el._id} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Deals;
