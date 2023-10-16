import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa6";
import { SiExpress, SiMongodb } from "react-icons/si";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import AnimatedPage from "../components/AnimatedPage";

const About = () => {
  return (
    <AnimatedPage>
      <Box w={["90%"]}>
        <Flex direction="column" gap={8}>
          <Box letterSpacing="0.5px">
            <Heading size={["md", "lg"]} mb={4}>
              Hi, Myself iNotes 👋🏻
            </Heading>
            <Text fontSize={["md", "lg"]}>
              Here I can help you manage your personal notes with ease. You can
              create, update and delete your notes efficiently. Also with some
              security features, they are safe and only you can see them.
            </Text>
          </Box>
          <Box>
            <Heading size={["sm", "md"]} mb={3} letterSpacing="0.5px">
              Tech Stack
            </Heading>
            <Stack
              direction={["column", "row"]}
              spacing={["0.8rem", "1rem"]}
              wrap="wrap"
            >
              <Button
                as="a"
                href="//react.dev/"
                target="_black"
                leftIcon={<Icon as={FaReact} boxSize={6} color="#5ED3F3" />}
              >
                React
              </Button>
              <Button
                as="a"
                href="//nodejs.org/"
                target="_black"
                leftIcon={<Icon as={FaNodeJs} boxSize={6} color="#6EA45F" />}
              >
                Node
              </Button>
              <Button
                as="a"
                href="//expressjs.com/"
                target="_black"
                leftIcon={<Icon as={SiExpress} boxSize={6} color="#000" />}
              >
                Express
              </Button>
              <Button
                as="a"
                href="//www.mongodb.com/"
                target="_black"
                leftIcon={<Icon as={SiMongodb} boxSize={6} color="#51AF3F" />}
              >
                MongoDB
              </Button>
            </Stack>
          </Box>
          <Box fontSize={["md", "lg"]} letterSpacing="0.5px">
            <Heading size={["sm", "md"]} mb={2}>
              View Source
            </Heading>
            <UnorderedList>
              <ListItem>
                iNotes Client:{" "}
                <Link
                  target="_blank"
                  href="//github.com/mohit-kwatra/iNotes-client"
                  color="blue.400"
                  isExternal
                >
                  View on Github <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>
                iNotes Server:{" "}
                <Link
                  target="_blank"
                  href="//github.com/mohit-kwatra/iNotes-server"
                  color="blue.400"
                  isExternal
                >
                  View on Github <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Text as="i" fontSize={["md", "lg"]} letterSpacing="0.5px">
            Developed & Designed with 💖 by{" "}
            <Link
              href="//twitter.com/Mohitkwatra_"
              target="_blank"
              color="blue.400"
            >
              Mohit Kwatra
            </Link>
          </Text>
        </Flex>
      </Box>
    </AnimatedPage>
  );
};

export default About;
