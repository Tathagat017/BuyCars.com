import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  Text,
  Button,
  Divider,
  ButtonGroup,
  Image,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  deletehData,
  patchData,
  getData,
} from "../Redux/Inventory/actionCreater";

const InventoryRow = ({ el, setTrig }) => {
  const toast = useToast();
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch();
  let [same, setSame] = useState(false);

  const [editDetials, setEditDetails] = useState({
    ...el,
  });
  const { token } = useSelector((state) => state.auth);
  function handleDelete(id) {}
  let dealerId = "";
  useEffect(() => {
    dealerId = sessionStorage.getItem("dealerId") || null;
    if (dealerId == el.dealerId) {
      setSame(true);
    }
  }, []);

  function handleDelete(id) {
    dispatch(deletehData(token, id));
    toast({
      title: `Deleted successfully`,
      position: "top",
      isClosable: true,
      colorScheme: "whatsapp",
    });
    dispatch(getData(token, 1, "", "", "", "", ""));
    setTrig((prev) => !prev);
  }

  const handleEdit = (id) => {
    //console.log(editDetials);
    dispatch(patchData(token, id, editDetials));
    // setTrig((p) => !p);
    setEdit((prev) => !prev);
    dispatch(getData(token, 1, "", "", "", "", ""));
  };

  const handleInputChange = (e) => {
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

    setEditDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // console.log(editDetials);
  };
  el = { ...editDetials };
  return (
    <Box
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        width: "100%",
      }}
      _hover={{ transform: "scale(1.02)", transition: "transform 0.3s ease" }}
    >
      <Card maxW="xs">
        <CardBody border={"0px"}>
          <Image src={el.image} borderRadius="lg" m={"auto"} />
          <Stack mt="6" spacing="3">
            <Heading size="md">{el.title}</Heading>
            {edit ? (
              <Text>Dealer : {editDetials.dealer_full_name}</Text>
            ) : (
              <Input
                type="text"
                name="dealer_full_name"
                value={editDetials.dealer_full_name}
                placeholder={`Dealer Name : ${el.dealer_full_name}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Car Model : {el.vehicle_model_name}</Text>
            ) : (
              <Input
                type="text"
                value={editDetials.vehicle_model_name}
                name="vehicle_model_name"
                placeholder={`Model : ${el.vehicle_model_name}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Year of Launch : {el.year_of_launch}</Text>
            ) : (
              <Input
                type="text"
                name="year_of_launch"
                value={editDetials.year_of_launch}
                placeholder={`Year : ${el.year_of_launch}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Mileage : {el.vehicle_mileage}</Text>
            ) : (
              <Input
                type="text"
                name="vehicle_mileage"
                value={editDetials.vehicle_mileage}
                placeholder={`Mileage : ${el.vehicle_mileage}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Max Speed : {el.vehicle_max_speed} km/h</Text>
            ) : (
              <Input
                type="number"
                name="vehicle_max_speed"
                value={editDetials.vehicle_max_speed}
                placeholder={`Speed : ${el.vehicle_max_speed}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Odometer : {el.odomoter_reading} Kms</Text>
            ) : (
              <Input
                type="number"
                name="odomoter_reading"
                value={editDetials.odomoter_reading}
                placeholder={`Odomoter Reading : ${el.odomoter_reading}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Original Paint : {el.vehicle_original_paint}</Text>
            ) : (
              <Input
                type="text"
                name="vehicle_original_paint"
                value={editDetials.vehicle_original_paint}
                placeholder={`Original Paint : ${el.vehicle_original_paint}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Major Scatches : {el.major_scrates}</Text>
            ) : (
              <Input
                type="number"
                name="major_scrates"
                value={editDetials.major_scrates}
                placeholder={`Major Scatches : ${el.major_scrates}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text>Ex-showroom-price: Rs {el.vehicle_ex_showroom_price}</Text>
            ) : (
              <Input
                type="number"
                name="vehicle_ex_showroom_price"
                value={editDetials.vehicle_ex_showroom_price}
                placeholder={`Ex-showroom-price: Rs : ${el.vehicle_ex_showroom_price}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Previous Accidents : {el.vehicle_previous_accidents}</Text>
            ) : (
              <Input
                type="number"
                name="vehicle_previous_accidents"
                value={editDetials.vehicle_previous_accidents}
                placeholder={`Previous Accidents: ${el.vehicle_previous_accidents}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Registered at : {el.vehicle_registration_location}</Text>
            ) : (
              <Input
                type="text"
                value={editDetials.vehicle_registration_location}
                name="vehicle_registration_location"
                placeholder={`Registered at: ${el.vehicle_registration_location}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text> Current Location : {el.vehicle_current_location}</Text>
            ) : (
              <Input
                type="text"
                value={editDetials.vehicle_current_location}
                name="vehicle_current_location"
                placeholder={`Current Location: ${el.vehicle_current_location}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
            {edit ? (
              <Text color="orange" fontSize="2xl">
                Price : Rs.{el.vehicle_dealer_price}
              </Text>
            ) : (
              <Input
                type="number"
                value={editDetials.vehicle_dealer_price}
                name="vehicle_dealer_price"
                placeholder={` Price : Rs. ${el.vehicle_dealer_price}`}
                onChange={(e) => handleInputChange(e)}
              ></Input>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" justifyContent={"space-around"}>
            {edit ? (
              <Button
                color={"#f28c00"}
                bg={"#282c34"}
                _hover={{ bg: "orange.400", color: "black" }}
                variant="solid"
                colorScheme="blue"
                isDisabled={!same}
                hidden={!same}
                onClick={(e) => setEdit((edit) => !edit)}
              >
                Edit
              </Button>
            ) : (
              <Button
                color={"#f28c00"}
                bg={"#282c34"}
                _hover={{ bg: "orange.400", color: "black" }}
                variant="solid"
                colorScheme="blue"
                isDisabled={!same}
                hidden={!same}
                onClick={(e) => setEdit((edit) => !edit)}
              >
                Cancel Edit
              </Button>
            )}
            <Button
              color={"aliceblue"}
              bg={"orange.300"}
              _hover={{ bg: "orange.400", color: "black", border: "none" }}
              variant="solid"
              colorScheme="blue"
              isDisabled={same}
              hidden={same}
              border={"2.5px solid black"}
            >
              Buy
            </Button>

            {edit ? (
              <Button
                variant="ghost"
                colorScheme="blackAlpha.500"
                _hover={{ bg: "orange.300", color: "black" }}
                isDisabled={!same}
                hidden={!same}
                onClick={() => handleDelete(el._id)}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="ghost"
                colorScheme="blackAlpha.500"
                _hover={{ bg: "orange.300", color: "black" }}
                isDisabled={!same}
                hidden={!same}
                onClick={() => handleEdit(el._id)}
              >
                save
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default InventoryRow;
