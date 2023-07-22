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
  Box,
} from "@chakra-ui/react";
import ColorSquares from "./SquareBoxes";
import { getData, postData } from "../Redux/Inventory/actionCreater";
import { useNavigate } from "react-router-dom";
const TableRow = ({ el }) => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

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
    major_scrates: "",
    vehicle_original_paint: "",
    vehicle_previous_accidents: "",
    number_of_previous_buyers: "",
    vehicle_registration_location: "",
    vehicle_current_location: "",
    vehicle_dealer_price: "",
    date_posted: Date.now(),
  });

  const navigate = useNavigate();
  const handleSelect = () => {
    onDrawerOpen();
  };

  const handleInput = (e) => {
    let { name, value } = e.target;

    //console.log(name, value);
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
    //validation
    if (
      (dealerDetails.vehicle_oem_name =
        "" ||
        dealerDetails.odomoter_reading == "" ||
        dealerDetails.major_scrates == "" ||
        dealerDetails.vehicle_original_paint == "" ||
        dealerDetails.vehicle_previous_accidents == "" ||
        dealerDetails.number_of_previous_buyers == "" ||
        dealerDetails.vehicle_registration_location == "" ||
        dealerDetails.vehicle_current_location == "" ||
        dealerDetails.vehicle_dealer_price == "")
    ) {
      return toast({
        title: `Please fill all the required details/fields`,
        position: "top",
        isClosable: true,
        colorScheme: "red",
      });
    }
    // console.log(dealerDetails, token);
    dispatch(postData(token, dealerDetails));
    dispatch(getData(token));
    setTimeout(() => {
      toast({
        title: `Car added successfully to inventory,navigating to inventory`,
        position: "top",
        isClosable: true,
        colorScheme: "orange",
      });
    }, 300);
    setTimeout(() => {
      navigate("/inventory");
    }, 500);
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
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <Button
              onClick={handleSelect}
              variant={"outline"}
              bg={"gray.200"}
              color={"blackAlpha.900"}
              _hover={{ bg: "orange.300", color: "black" }}
              w={"80%"}
            >
              Select model
            </Button>
          </Box>
        </Td>
      </Tr>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontFamily={"sans-serif"}>
            Add Vehicle of this model to inventory
          </DrawerHeader>

          <DrawerBody>
            <Text>Manufacturer</Text>
            <Input
              placeholder={`${el.vehicle_oem_name}`}
              value={dealerDetails.vehicle_oem_name}
              name="vehicle_oem_name"
              onChange={(e) => handleInput(e)}
            />
            <Text>Model</Text>
            <Input
              placeholder={`${el.vehicle_model_name}`}
              value={dealerDetails.vehicle_model_name}
              name="vehicle_model_name"
              onChange={(e) => handleInput(e)}
            />
            <Text>Year</Text>
            <Input
              placeholder={`${el.year_of_launch}`}
              value={dealerDetails.year_of_launch}
              name="year_of_launch"
              onChange={(e) => handleInput(e)}
            />
            <Text>Ex_showroom_price</Text>
            <Input
              placeholder="price"
              value={dealerDetails.vehicle_ex_showroom_price}
              name="vehicle_ex_showroom_price"
              onChange={(e) => handleInput(e)}
            />
            <Text>Mileage</Text>
            <Input
              name="vehicle_mileage"
              value={dealerDetails.vehicle_mileage}
              placeholder="mileage"
              onChange={(e) => handleInput(e)}
            />
            <Text>Max Speed</Text>
            <Input
              value={dealerDetails.vehicle_max_speed}
              name="vehicle_max_speed"
              placeholder="max speed"
              onChange={(e) => handleInput(e)}
            />

            <Text>Available Colors</Text>
            <Input
              value={dealerDetails.vehicle_available_colors}
              name="vehicle_available_colors"
              placeholder="vehicle_available_colors"
              onChange={(e) => handleInput(e)}
            />
            <Text>Power</Text>
            <Input
              value={dealerDetails.vehicle_power}
              placeholder="Power"
              name="vehicle_power"
              onChange={(e) => handleInput(e)}
            />

            <Text>Image</Text>
            <Input placeholder="Image" value={dealerDetails.image} />

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
            <Text> number of previous buyers</Text>
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
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
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
