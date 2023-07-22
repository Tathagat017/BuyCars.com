import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  useDisclosure,
  Stack,
  Text,
  Image,
  Link as LinkChakra,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Auth/actionCreater";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleLogout = () => {
    // window.location.reload();
    dispatch(logoutUser());
    //console.log(isAuth);
    toast({
      title: `Logout successful`,
      position: "top",
      isClosable: true,
      colorScheme: "orange",
    });
  };

  return (
    <Flex
      py={2}
      px={4}
      direction={["column", "row"]}
      justify="space-between"
      className={(styles.text_color, styles.container)}
      mb={"2%"}
      position="sticky"
      zIndex="10"
      top="0"
    >
      <Flex alignItems="center" wrap="wrap">
        <Flex flexGrow={1} justify="center">
          <LinkChakra href="/">
            <Box ml={[4, 0]} textAlign={"center"}>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                direction={["column", "row"]}
              >
                <Image src="classifieds.svg" boxSize={"80px"}></Image>
                <Text color={"orange.200"}>BuyCars.com</Text>
              </Flex>
            </Box>
          </LinkChakra>
        </Flex>
        <HamburgerIcon
          onClick={isOpen ? onClose : onOpen}
          display={["inline", "none"]}
          // border='1px'
          color={"orange"}
        />
      </Flex>
      <Flex
        display={[isOpen ? "flex" : "none", "flex"]}
        justifyContent={"center"}
        bg={["#282c34", "#282c34"]}
      >
        <Stack
          align="center"
          className={styles.text_color}
          direction={["column", "row"]}
          display={"flex"}
          gap={"40px"}
          justifyContent={"center"}
          textDecor={"none"}
        >
          <Link to="/">
            <Text>Home</Text>
          </Link>
          <Link to="/deals">Car Details</Link>
          <Link to="/inventory">Inventory</Link>
          {!isAuth ? (
            <Link to="/signin">Signup/Login</Link>
          ) : (
            <Button
              bg={"#282c34"}
              color={"orange.400"}
              _hover={{ bg: "orange.300", color: "black" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
