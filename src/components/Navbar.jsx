import React, { useContext } from "react";
import {
  Link,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  SlideFade,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { reducerCases } from "../contexts/AuthReducer";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [{ token }, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();

  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FaSun />, <FaMoon />);
  const backdropBg = useColorModeValue(
    "rgba(37,95,255,0.1)",
    "rgba(50,50,50,0.1)"
  );
  const navBg = useColorModeValue("whiteAlpha.800", "gray.800");
  const dividerColor = useColorModeValue("#000", "#ffffff");

  const onLogout = () => {
    dispatch({ type: reducerCases.deleteToken });
    localStorage.removeItem("Token");
    navigate("/login");
  };

  const toggleColors = () => {
    toggleColorMode();
    const styleEl = document.createElement("style");
    const cssText = document.createTextNode(
      "html * { transition: color, background-color 0.3s ease-out!important }"
    );
    styleEl.appendChild(cssText);
    document.head.appendChild(styleEl);
    setTimeout(() => {
      document.head.removeChild(styleEl);
    }, 300);
  };

  return (
    <SlideFade
      in={true}
      offsetY={-20}
      transition={{ enter: { duration: 0.5, delay: 0.7 } }}
    >
      <Center
        w="100%"
        minHeight={["80px", "100px"]}
        backdropFilter="blur(10px)"
        borderBottom="1px solid rgba(0,0,0,0.1)"
        bg={backdropBg}
      >
        <Flex
          w={["85%", null, "60%", "50%"]}
          wrap="wrap"
          minWidth="max-content"
          alignItems="center"
          gap="2"
          py="3"
          px="4"
          bg={navBg}
          rounded="md"
          shadow="md"
        >
          <Box>
            <Heading size="md">
              <Text
                bgGradient="linear(to-r,blue.500 30%,purple.500)"
                bgClip="text"
              >
                iNotes
              </Text>
            </Heading>
          </Box>
          <Spacer />
          <Center gap={3}>
            {token && (
              <Link as={ReactRouterLink} to="/" fontSize={["12px", "14px"]}>
                Home
              </Link>
            )}
            <Link as={ReactRouterLink} to="/about" fontSize={["12px", "14px"]}>
              About
            </Link>
            <Box
              width="1px"
              height="16px"
              borderLeftWidth="1px"
              borderLeftStyle="solid"
              borderLeftColor={dividerColor}
              opacity={0.6}
            ></Box>
            <ButtonGroup
              size={["xs", "sm"]}
              variant="outline"
              colorScheme="blue"
            >
              {!token ? (
                <>
                  <Button as={ReactRouterLink} to="/signup" variant="solid">
                    Sign Up
                  </Button>
                  <Button as={ReactRouterLink} to="/login">
                    Log in
                  </Button>
                </>
              ) : (
                <Button onClick={onLogout}>Log Out</Button>
              )}
            </ButtonGroup>
            <Box
              width="1px"
              height="16px"
              borderLeftWidth="1px"
              borderLeftStyle="solid"
              borderLeftColor={dividerColor}
              opacity={0.6}
            ></Box>
            <IconButton
              aria-label="Toggle Color Mode"
              icon={icon}
              variant="ghost"
              onClick={toggleColors}
            />
          </Center>
        </Flex>
      </Center>
    </SlideFade>
  );
};

export default Navbar;
