import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//external modules
import { login } from "../Redux/Auth/actionCreater";
//charkra imports
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setDetails] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuth, isError, token } = useSelector(
    (store) => store.auth
  );

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userDetails.password) {
      return alert("Please fill the password");
    } else if (!userDetails.email) {
      return alert("Please fill the email");
    } else {
      dispatch(login(userDetails.email, userDetails.password));

      setTimeout(() => {
        {
          //  console.log(1);
          toast({
            title: `Login successful`,
            position: "top",
            isClosable: true,
            colorScheme: "orange",
          });

          navigate("/deals");
        }
      }, 3000);
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
            <HStack></HStack>
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
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={isLoading}
                size="md"
                color={"#f28c00"}
                bg={"#282c34"}
                _hover={{ bg: "orange.300", color: "black" }}
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
