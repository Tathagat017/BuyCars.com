import React, { useState } from "react";
import Signup from "../Components/SignUp";
import Login from "../Components/Login";
import { Flex, Box, Stack, Button, background } from "@chakra-ui/react";
const LoginAndSignUp = () => {
  const [login, showLogin] = useState(false);

  const handleLogin = () => {
    showLogin((login) => true);
  };

  const handleSignUp = () => {
    showLogin((login) => false);
  };

  return (
    <div>
      <Flex justifyContent={"space-around"}>
        <Button
          color={"#f28c00"}
          bg={"#282c34"}
          _hover={{ bg: "orange.300", color: "black" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          color={"#f28c00"}
          bg={"#282c34"}
          _hover={{ bg: "orange.300", color: "black" }}
          onClick={handleSignUp}
        >
          Signup
        </Button>
      </Flex>
      {!login && <Signup handleLogin={handleLogin} />}
      {login && <Login />}
    </div>
  );
};

export default LoginAndSignUp;
