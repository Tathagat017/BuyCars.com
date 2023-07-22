import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Tr,
  Td,
  Image,
  Button,
  useDisclosure,
  DrawerFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import ColorSquares from "./SquareBoxes";
import { getData, postData } from "../Redux/Inventory/actionCreater";
import axios from "axios";
const TableRow = ({ el }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = React.useRef();
  const [dealerDetails, setDealerDetails] = useState({
    vehicle_oem_name: el.vehicle_oem_name,
    vehicle_model_name: el.vehicle_model_name,
    year_of_launch: el.year_of_launch,
    vehicle_ex_showroom_price: el.vehicle_ex_showroom_price,
    vehicle_available_colors: el.vehicle_available_colors,
    vehicle_mileage: el.vehicle_mileage,
    vehicle_max_speed: el.vehicle_max_speed,
    vehicle_power: el.vehicle_power,
    image: el.image,
    odomoter_reading: "",
    major_scrates: 0,
    vehicle_original_paint: "Red",
    vehicle_previous_accidents: 0,
    number_of_previous_buyers: 1,
    vehicle_registration_location: "Bengaluru",
    vehicle_current_location: "Bengaluru",
    vehicle_dealer_price: 10000,
    date_posted: Date.now(),
  });

  const handleSelect = () => {
    onOpen();
  };

  const handleInput = (e) => {
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

    setDealerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      vehicle_available_colors: ["Red", "Black"],
    }));
    //console.log(dealerDetails);
  };

  const handlePostData = async (e, dealerDetails, token) => {
    e.preventDefault();
    // console.log(dealerDetails, token);
    dispatch(postData(token, dealerDetails));
    toast({
      title: `Data added successfully`,
      position: "top",
      isClosable: true,
      colorScheme: "orange",
    });
    dispatch(getData(token));
  };

  return (
    <>
      <Tr>
        <Td>{el.vehicle_oem_name}</Td>
        <Td>{el.vehicle_model_name}</Td>
        <Td>{el.year_of_launch}</Td>
        <Td>{el.vehicle_ex_showroom_price}</Td>
        <Td>
          <ColorSquares
            colors={el.vehicle_available_colors}
            numberOfBoxes={el.vehicle_available_colors.length}
          />
        </Td>
        <Td>{el.vehicle_mileage}</Td>
        <Td>{el.vehicle_max_speed}</Td>
        <Td>{el.vehicle_power}</Td>
        <Td>
          <Image src={el.image} />
        </Td>
        <Td>
          <Button
            onClick={handleSelect}
            variant={"outline"}
            bg={"gray.200"}
            color={"blackAlpha.900"}
            _hover={{ bg: "orange.300", color: "black" }}
          >
            Select
          </Button>
        </Td>
      </Tr>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Vehicle of this model</DrawerHeader>

          <DrawerBody>
            <Text>Manufacturer</Text>
            <Input placeholder="Manufacturer" value={el.vehicle_oem_name} />
            <Text>Model</Text>
            <Input placeholder="Model" value={el.vehicle_model_name} />
            <Text>Year</Text>
            <Input placeholder="Year" value={el.year_of_launch} />
            <Text>Ex_showroom_price</Text>
            <Input placeholder="price" value={el.vehicle_ex_showroom_price} />
            <Text>Mileage</Text>
            <Input placeholder="mileage" value={el.vehicle_mileage} />
            <Text>Max Speed</Text>
            <Input placeholder="max speed" value={el.vehicle_max_speed} />

            <Text>Available Colors</Text>
            <Input
              placeholder="vehicle_available_colors"
              value={el.vehicle_available_colors}
              name="vehicle_available_colors"
            />
            <Text>Power</Text>
            <Input
              placeholder="Power"
              name="vehicle_power"
              value={el.vehicle_power}
            />

            <Text>Image</Text>
            <Input placeholder="Image" value={el.image} />

            <Text>Odometer Reading</Text>
            <Input
              placeholder="odomoter_reading"
              value={dealerDetails.odomoter_reading}
              name="odomoter_reading"
              onChange={(e) => handleInput(e)}
            />
            <Text>major scrates</Text>
            <Input
              placeholder="odomoter_reading"
              value={dealerDetails.major_scrates}
              name="major_scrates"
              onChange={(e) => handleInput(e)}
            />
            <Text>vehicle_original_paint</Text>
            <Input
              placeholder="vehicle_original_paint"
              value={dealerDetails.vehicle_original_paint}
              name="vehicle_original_paint"
              onChange={(e) => handleInput(e)}
            />
            <Text> vehicle_previous_accidents</Text>
            <Input
              placeholder="vehicle_previous_accidents"
              value={dealerDetails.vehicle_previous_accidents}
              name="vehicle_previous_accidents"
              onChange={(e) => handleInput(e)}
            />
            <Text> vehicle_previous_accidents</Text>
            <Input
              placeholder="number_of_previous_buyers"
              value={dealerDetails.number_of_previous_buyers}
              name="number_of_previous_buyers"
              onChange={(e) => handleInput(e)}
            />
            <Text> vehicle_registration_location</Text>
            <Input
              placeholder="vehicle_registration_location"
              value={dealerDetails.vehicle_registration_location}
              name="vehicle_registration_location"
              onChange={(e) => handleInput(e)}
            />
            <Text>vehicle_current_location</Text>
            <Input
              placeholder="vehicle_current_location"
              value={dealerDetails.vehicle_current_location}
              name="vehicle_current_location"
              onChange={(e) => handleInput(e)}
            />
            <Text> vehicle_dealer_price</Text>
            <Input
              placeholder="vehicle_dealer_price"
              value={dealerDetails.vehicle_dealer_price}
              name="vehicle_dealer_price"
              onChange={(e) => handleInput(e)}
            />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={(e) => handlePostData(e, dealerDetails, token)}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TableRow;
