import { InfoIcon } from "@chakra-ui/icons";
import { Flex, Text, chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import React from "react";
import { slideDownFade } from "../motion/presets";

const MotionDiv = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const InputError = ({ message }) => {
  return (
    <MotionDiv {...slideDownFade} mt={2} maxW="fit-content">
      <Flex
        bg="red.100"
        rounded="md"
        px={2}
        py={1}
        align="center"
        gap={1}
        color="red.500"
        fontSize="sm"
      >
        <InfoIcon />
        <Text fontWeight="400">{message}</Text>
      </Flex>
    </MotionDiv>
  );
};

export default InputError;
