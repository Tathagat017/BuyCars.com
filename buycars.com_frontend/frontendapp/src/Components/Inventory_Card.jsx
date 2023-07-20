import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Button,
  Divider,
  ButtonGroup,
  Image,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";

const InventoryRow = ({ el }) => {
  // console.log(el);

  function handleDelete(id) {}

  return (
    <Flex gap={6}>
      <Card maxW="sm">
        <CardBody>
          <Image src={el.image} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{el.title}</Heading>
            <Text>Dealer :{el.dealer_full_name}</Text>
            <Text> Car Model : {el.vehicle_model_name}</Text>
            <Text> Year of Launch : {el.year_of_launch}</Text>
            <Text> Mileage : {el.vehicle_mileage}</Text>
            <Text> Max Speed : {el.vehicle_max_speed} km/h</Text>
            <Text> Odometer : {el.odomoter_reading} Kms</Text>
            <Text> Original Paint : {el.vehicle_original_paint}</Text>
            <Text> Major Scatches : {el.major_scrates}</Text>
            <Text>Ex-showroom-price : {el.vehicle_ex_showroom_price}</Text>
            <Text> Previous Accidents : {el.vehicle_previous_accidents}</Text>
            <Text> Registered at : {el.vehicle_registration_location}</Text>
            <Text> Current Location : {el.vehicle_current_location}</Text>
            <Text color="orange" fontSize="2xl">
              Price : {el.vehicle_dealer_price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Edit
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Delete
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default InventoryRow;
