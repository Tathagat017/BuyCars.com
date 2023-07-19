import React from "react";
import styles from "./Navbar.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";

import {
  Flex,
  Box,
  useDisclosure,
  Stack,
  Link,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Flex
        py={2}
        px={4}
        direction={["column", "row"]}
        justify="space-between"
        bg="#222222"
        color={"#f28c00"}
        boxShadow={"rgb(38, 57, 77) 0px 20px 30px -10px"}
      >
        <Flex alignItems="center" wrap="wrap">
          <Flex flexGrow={1} justify="center">
            <Link href="/">
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
            </Link>
          </Flex>
          <HamburgerIcon
            onClick={isOpen ? onClose : onOpen}
            display={["inline", "none"]}
            // border='1px'
          />
        </Flex>
        <Flex
          display={[isOpen ? "flex" : "none", "flex"]}
          justifyContent={"center"}
          bg={["#222222", "#222222"]}
        >
          <Stack
            align="center"
            color={"#f28c00"}
            direction={["column", "row"]}
            display={"flex"}
            gap={"40px"}
            justifyContent={"center"}
            textDecor={"none"}
          >
            <Link href="/">Home</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/signin">Signup/Login</Link>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
