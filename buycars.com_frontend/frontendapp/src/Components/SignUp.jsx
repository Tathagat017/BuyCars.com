import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupFunction } from "./../Redux/Auth/actionCreater";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Signup({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const [userDetails, setDetails] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const toast = useToast();
  const dispatch = useDispatch();

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const { isLoading, isAuth, isError, signupsuccess } = useSelector(
    (store) => store.auth
  );

  function isAllPresent(str) {
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    if (!str || str.length === 0) {
      return false;
    }

    if (pattern.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAllPresent(userDetails.password)) {
      if (userDetails.full_name && userDetails.email) {
        dispatch(
          signupFunction(
            userDetails.full_name,
            userDetails.email,
            userDetails.password
          )
        );

        if (signupsuccess) {
          toast({
            title: `successfully Registered user`,
            position: "top",
            isClosable: true,
            colorScheme: "orange",
          });
          handleLogin((prev) => true);
        }
      } else {
        return toast({
          title: `Please fill all the details`,
          position: "top",
          isClosable: true,
          colorScheme: "red",
        });
      }
    } else {
      return toast({
        title: `Please recheck your password`,
        position: "top",
        isClosable: true,
        colorScheme: "red",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("#ffffff", "#ffffff")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="full_name"
                onChange={(e) => handleFormInput(e)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={(e) => handleFormInput(e)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => handleFormInput(e)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text>
                Password should include an uppercase and lowercase alphabet,a
                number and a special character
              </Text>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="md"
                color={"#f28c00"}
                bg={"#282c34"}
                isLoading={isLoading}
                _hover={{ bg: "orange.300", color: "black" }}
                onClick={(e) => handleSubmit(e)}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
