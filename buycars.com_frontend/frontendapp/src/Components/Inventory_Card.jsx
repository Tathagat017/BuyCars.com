import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
} from "@chakra-ui/react";
import { deletehData } from "../Redux/Inventory/actionCreater";

const InventoryRow = ({ el }) => {
  // console.log(el);
  const [edit, useEdit] = useState(true);
  const dispatch = useDispatch();
  function handleDelete(id) {}
  let name = "";
  useEffect(() => {
    name = sessionStorage.getItem("full_name") || null;
  }, []);

  function handleDelete(id) {
    dispatch(deletehData(id));
  }

  const handleEdit = (id) => {};

  return (
    <Box>
      <Card maxW="sm">
        <CardBody>
          <Image src={el.image} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{el.title}</Heading>
            {edit ? (
              <Text>Dealer :{el.dealer_full_name}</Text>
            ) : (
              <Input type="text" name="dealer_full_name"></Input>
            )}
            {edit ? (
              <Text> Car Model : {el.vehicle_model_name}</Text>
            ) : (
              <Input type="text" name="vehicle_model_name"></Input>
            )}
            {edit ? (
              <Text> Year of Launch : {el.year_of_launch}</Text>
            ) : (
              <Input type="text" name="year_of_launch"></Input>
            )}
            {edit ? (
              <Text> Mileage : {el.vehicle_mileage}</Text>
            ) : (
              <Input type="text" name="vehicle_mileage"></Input>
            )}
            {edit ? (
              <Text> Max Speed : {el.vehicle_max_speed} km/h</Text>
            ) : (
              <Input type="number" name="vehicle_max_speed"></Input>
            )}
            {edit ? (
              <Text> Odometer : {el.odomoter_reading} Kms</Text>
            ) : (
              <Input type="number" name="odomoter_reading"></Input>
            )}
            {edit ? (
              <Text> Original Paint : {el.vehicle_original_paint}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text> Major Scatches : {el.major_scrates}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text>Ex-showroom-price : {el.vehicle_ex_showroom_price}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text> Previous Accidents : {el.vehicle_previous_accidents}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text> Registered at : {el.vehicle_registration_location}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text> Current Location : {el.vehicle_current_location}</Text>
            ) : (
              <Input></Input>
            )}
            {edit ? (
              <Text color="orange" fontSize="2xl">
                Price : {el.vehicle_dealer_price}
              </Text>
            ) : (
              <Input></Input>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              color={"#f28c00"}
              bg={"#282c34"}
              _hover={{ bg: "orange.300", color: "black" }}
              variant="solid"
              colorScheme="blue"
              isDisabled={el.dealer_full_name == name ? false : true}
              // hidden={el.dealer_full_name == name ? false : true}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              colorScheme="blackAlpha.500"
              _hover={{ bg: "orange.300", color: "black" }}
              isDisabled={el.dealer_full_name == name ? false : true}
              // hidden={el.dealer_full_name == name ? false : true}
              onClick={() => handleDelete(el._id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default InventoryRow;
