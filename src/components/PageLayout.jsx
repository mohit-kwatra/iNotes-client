import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Canvas from "./canvas/Canvas";
import Navbar from "./Navbar";

const PageLayout = ({ screen }) => {
  const siteWrapperBg = useColorModeValue("rgb(230,230,230)", "rgb(12,23,34)");
  const backdropBg = useColorModeValue(
    "rgba(37,95,255,0.1)",
    "rgba(50,50,50,0.1)"
  );

  return (
    <>
      <Box className="site-wrapper" w="100%" h="100vh" bg={siteWrapperBg}>
        <Canvas />
        <Flex
          w="100%"
          h="100%"
          direction="column"
          pos="relative"
          zIndex={1}
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              w: screen.width < 480 ? "5px" : "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              bg: "gray.500",
              rounded: "md",
              transition: "0.5s",
              "&:hover": {
                bg: "gray.600",
              },
            },
            "&::-webkit-scrollbar-track": {
              bg: "gray.400",
              rounded: "md",
            },
          }}
        >
          <Navbar />
          <Flex
            flexGrow="1"
            justify="center"
            align="start"
            p={["1rem", "4rem"]}
            py={["3rem"]}
          >
            <Flex
              direction="column"
              align="center"
              w={["100%", null, "80%"]}
              backdropFilter="blur(10px)"
              bg={backdropBg}
              p={["2rem", "4rem"]}
              py={["3rem"]}
              rounded="md"
            >
              <Outlet />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default PageLayout;
