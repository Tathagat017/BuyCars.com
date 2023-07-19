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
  Select,
} from "@chakra-ui/react";

import TableRow from "./../Components/TableRow";
import useDebounce from "../CutomHooks/UseThrottle";
import { getData } from "../Redux/Inventory/actionCreater";
import InventoryRow from "../Components/Inventory_Card";

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const isTableFullWidth = useBreakpointValue({ base: true, md: false });
  const { token } = useSelector((store) => store.auth);
  const { inventory_data } = useSelector((store) => store.inventory);
  const dispatch = useDispatch();
  //const [searchTerm, lastExecutedTime] = useDebounce(search, 200);
  useEffect(() => {
    dispatch(getData(token, page));
    // console.log(oem_specs);
  }, [page]);

  const handlePageNext = (page) => {
    setPage((page) => page + 1);
  };

  const handlePagePrev = (page) => {
    setPage((page) => page - 1);
  };

  const handleSearch = () => {
    dispatch(getData(token, page, search));
  };

  return (
    <Box w={"100%"} overflowX="auto">
      <TableContainer>
        <Flex justifyContent={"space-evenly"}>
          <Button onClick={handlePagePrev}>Previous</Button>
          <Select placeholder="Filter By Mileage ">
            <option value="1-10">1-10</option>
            <option value="10-20">10 -20</option>
            <option value="20-40">20-40</option>
          </Select>
          <Select placeholder="Filter By Price">
            <option value="100000">less than 100000</option>
            <option value="200000">less than 200000</option>
            <option value="300000">less than 300000 </option>
          </Select>
          <Select placeholder="Filter By Color">
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Other">Other </option>
          </Select>
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
          <TableCaption size="sm">Inventory</TableCaption>

          <Tbody>
            {inventory_data?.map((el) => {
              return <InventoryRow el={el} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inventory;
