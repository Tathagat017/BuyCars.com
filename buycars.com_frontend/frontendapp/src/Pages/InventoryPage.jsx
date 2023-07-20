import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  Tbody,
  TableCaption,
  TableContainer,
  Box,
  useBreakpointValue,
  Button,
  Flex,
  Input,
  Select,
  GridItem,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import {
  getData,
  getDataFilter,
  getDataSort,
} from "../Redux/Inventory/actionCreater";
import InventoryRow from "../Components/Inventory_Card";

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const isTableFullWidth = useBreakpointValue({ base: true, md: false });
  const { token } = useSelector((store) => store.auth);
  const { inventory_specs } = useSelector((store) => store.inventory);
  const dispatch = useDispatch();
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(10000);
  const [mileage, setMileage] = useState(1);
  const [sort, setSort] = useState("");
  const [trig, setTrig] = useState(false);
  //const [searchTerm, lastExecutedTime] = useDebounce(search, 200);
  useEffect(() => {
    dispatch(getData(token, page, search, color, mileage, price, sort));
    console.log(inventory_specs);
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

  const handleFilterPrice = (e) => {
    setPrice(e.target.value);
    // (token, page = 1, search = "", filter = "", sort = "", sortOrder)
    let filterword = "price";
    dispatch(getDataFilter(token, filterword, price));
    setTrig((prev) => !prev);
  };

  const handleFilterMileage = (e) => {
    setMileage(e.target.value);
    let filterword = "mileage";
    dispatch(getDataFilter(token, filterword, mileage));
    setTrig((prev) => !prev);
  };

  const handleFilterColor = (e) => {
    let filterword = "color";
    setColor(e.target.value);
    dispatch(getDataFilter(token, filterword, color));
    setTrig((prev) => !prev);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    dispatch(getDataSort(token, sort));
    setTrig((prev) => !prev);
  };

  return (
    <Box w={"100%"} overflowX="auto">
      <TableContainer>
        <Flex justifyContent={"space-evenly"}>
          <Button onClick={handlePagePrev}>Previous</Button>
          <Select
            placeholder="Filter By Mileage"
            onChange={(e) => handleFilterMileage(e)}
          >
            <option value="5">greater than 5</option>
            <option value="10">greater than 10</option>
            <option value="15">greater than 15</option>
            <option value="20">greater than 20</option>
            <option value="25">greater than 25</option>
            <option value="30">greater than 30</option>
          </Select>
          <Select
            placeholder="Filter By Price"
            onChange={(e) => handleFilterPrice(e)}
          >
            <option value="10000">less than 10000</option>
            <option value="200000">less than 200000</option>
            <option value="350000">less than 350000</option>
            <option value="600000">less than 600000 </option>
          </Select>

          <Select placeholder="Sort By Price" onChange={(e) => handleSort(e)}>
            <option value="asc">Low to High</option>
            <option value="desc">Hight to low</option>
          </Select>
          <Select
            placeholder="Filter By Color"
            onChange={(e) => handleFilterColor(e)}
          >
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
            <Grid cellSpacing="10" templateColumns="repeat(2, 1fr)" gap={20}>
              <GridItem>
                {inventory_specs.data?.map((el) => {
                  return <InventoryRow el={el} key={el._id} />;
                })}
              </GridItem>
            </Grid>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Inventory;
