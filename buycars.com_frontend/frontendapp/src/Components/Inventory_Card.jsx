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
} from "@chakra-ui/react";

const InventoryRow = ({ el }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{el.title}</Heading>
          <Text>Dealer :{el.full_name}</Text>
          <Text> Car Model : {el.vehicle_model_name}</Text>
          <Text> Odometer : {el.odometer_reading}</Text>
          <Text> Original Paint : {el.vehicle_original_paint}</Text>
          <Text> Major Scatches{el.major_scrates}</Text>
          <Text color="blue.600" fontSize="2xl">
            Price {el.dealer_price}
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
            Select To Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default InventoryRow;
