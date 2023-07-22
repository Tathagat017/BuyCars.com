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
  Text,
} from "@chakra-ui/react";
import { getOEM, postOEM } from "../Redux/OEM/actionCreater";
import TableRow from "./../Components/TableRow";
import useDebounce from "../CutomHooks/UseThrottle";
import styles from "./Deal.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
const Deals = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [new_model, setNewModel] = useState({
    vehicle_oem_name: "",
    vehicle_model_name: "",
    year_of_launch: "",
    vehicle_ex_showroom_price: "",
    vehicle_available_colors: "",
    vehicle_mileage: "",
    vehicle_power: "",
    vehicle_max_speed: "",
    image: "",
  });
  const isTableFullWidth = useBreakpointValue({ base: true, md: false });
  const { token } = useSelector((store) => store.auth);
  const { oem_specs } = useSelector((store) => store.oem);
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
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
  const handleAddModelClick = () => {
    onModalOpen();
  };

  const handleChangeModalInput = (e) => {
    let { name, value } = e.target;

    if (
      name == "vehicle_ex_showroom_price" ||
      name == "vehicle_mileage" ||
      name == "vehicle_power" ||
      name == "vehicle_max_speed" ||
      name == "odomoter_reading" ||
      name == " major_scrates" ||
      name == "vehicle_previous_accidents" ||
      name == "number_of_previous_buyers" ||
      name == "vehicle_dealer_price"
    ) {
      value = Number(value);
    }

    setNewModel((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddNewModelToDb = () => {
    console.log(new_model);
    dispatch(postOEM(token, new_model));
    toast({
      title: `New OEM Model Added successfully`,
      position: "top",
      isClosable: true,
      colorScheme: "whatsapp",
    });
    dispatch(getOEM(token, page));
  };

  return (
    <>
      <Box w={"100%"} overflowX="auto" textAlign={"center"}>
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
          <Button
            variant={"link"}
            fontSize="sm"
            as="cite"
            color={"orange.300"}
            _hover={{ bg: "orange.200", color: "black", cursor: "pointer" }}
            onClick={handleAddModelClick}
            textDecor={"underline"}
          >
            Not finding the model of your choice? Click here to add new OEM
            model and specs
          </Button>
          <br></br>
          <Text fontSize="xs" as="cite" color={"orange.300"}>
            * Click on "Select Model" to select a prexisting model with OEM
            specs and custimize it to add to inventory
          </Text>
          <Table
            size={isTableFullWidth ? "md" : "sm"}
            className={styles.table_tiny}
          >
            <TableCaption size="sm">OEM SPECIFICATIONS</TableCaption>

            <Thead>
              <Tr>
                <Th>Manufacturer</Th>
                <Th>Model</Th>
                <Th>
                  Year <br></br>of Launch
                </Th>
                <Th>
                  Ex-showroom<br></br> price
                </Th>
                <Th>Colors</Th>
                <Th>Mileage</Th>
                <Th>
                  Max Speed<br></br>(km/h)
                </Th>
                <Th>
                  Power<br></br>(BHP)
                </Th>
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
        <Button
          variant={"ghost"}
          isActive={false}
          _hover={{ cursor: "default" }}
        >
          Page : {page}/9
        </Button>
      </Box>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New OEM Model and Specs</ModalHeader>
          <ModalBody>
            <Box>
              <Input
                placeholder="vehicle oem name(Manufacturer)"
                name="vehicle_oem_name"
                value={new_model.vehicle_oem_name}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_model_name"
                name="vehicle_model_name"
                value={new_model.vehicle_model_name}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="year_of_launch"
                name="year_of_launch"
                value={new_model.year_of_launch}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_ex_showroom_price"
                name="vehicle_ex_showroom_price"
                value={new_model.vehicle_ex_showroom_price}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_available_colors"
                name="vehicle_available_colors"
                value={new_model.vehicle_available_colors}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_mileage"
                name="vehicle_mileage"
                value={new_model.vehicle_mileage}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_power"
                name="vehicle_power"
                value={new_model.vehicle_power}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="vehicle_max_speed"
                name="vehicle_max_speed"
                value={new_model.vehicle_max_speed}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
              <Input
                placeholder="image"
                name="image"
                value={new_model.image}
                onChange={(e) => handleChangeModalInput(e)}
              ></Input>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              _hover={{ bg: "orange.300", color: "black", cursor: "pointer" }}
              mr={3}
              onClick={onModalClose}
            >
              Close
            </Button>
            <Button
              _hover={{ bg: "orange.300", color: "black", cursor: "pointer" }}
              onClick={handleAddNewModelToDb}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Deals;
