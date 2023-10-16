import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { NoteContext } from "../contexts/NoteContext";
import Note from "./Note";
import axios from "axios";
import { reducerCases } from "../contexts/NoteReducer";
import { AuthContext } from "../contexts/AuthContext";

const Notes = () => {
  const [{ notes }, dispatch] = useContext(NoteContext);
  const { token } = useContext(AuthContext)[0];

  const toast = useToast();
  const bg = useColorModeValue("whiteAlpha.800", "gray.800");

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;

      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notes/fetch-all`, {
          headers: {
            "Auth-Token": token,
          },
        })
        .then((res) => {
          const notes = res.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          dispatch({ type: reducerCases.fetchNotes, payload: notes });
        })
        .catch((axiosError) => {
          toast({
            title: "Something Went Wrong.",
            description: "Some errors occurred while fetching your note.",
            status: "error",
            variant: "top-accent",
            duration: 5000,
            isClosable: true,
          });
          console.log(axiosError);
        });
    }
    //eslint-disable-next-line
  }, []);

  const deleteNote = (noteId, closeDialog, setIsLoading) => {
    setIsLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/notes/delete/${noteId}`,
        {
          headers: {
            "Auth-Token": token,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);

        if (res.data.statusText === "SUCCESS") {
          closeDialog();
          dispatch({ type: reducerCases.deleteNote, payload: noteId });
          toast({
            title: "Note Deleted.",
            description: "Your note is deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
            variant: "top-accent",
          });
        }
      })
      .catch((axiosError) => {
        setIsLoading(false);

        console.log(axiosError);
        closeDialog();
        toast({
          title: "Something Went Wrong.",
          description: "There was some errors deleting your note.",
          status: "error",
          variant: "top-accent",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const editNote = (noteId, closeDialog, data, setIsLoading) => {
    setIsLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/notes/update/${noteId}`,
        {
          ...data,
        },
        {
          headers: {
            "Auth-Token": token,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);

        if (res.data.statusText === "SUCCESS") {
          dispatch({ type: reducerCases.editNote, id: noteId, payload: data });
          closeDialog();
          toast({
            title: "Note Edited.",
            description: "Your note is edited.",
            status: "success",
            duration: 5000,
            isClosable: true,
            variant: "top-accent",
          });
        }
      })
      .catch((axiosError) => {
        setIsLoading(false);

        console.log(axiosError);
        closeDialog();
        toast({
          title: "Something Went Wrong.",
          description: "There was some errors editing your note.",
          status: "error",
          variant: "top-accent",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box w={["100%", null, "90%", null, "80%"]}>
      <Heading size="md" mb={5}>
        Your Notes:
      </Heading>
      <SimpleGrid columns={[1, null, null, 2]} spacing={[3, null, null, 5]}>
        {notes.length ? (
          notes.map((note) => (
            <Note
              key={note._id}
              note={note}
              deleteNote={deleteNote}
              editNote={editNote}
            />
          ))
        ) : (
          <Card bg={bg} shadow="md">
            <CardBody>
              <Text>We could not find any notes of you :(</Text>
            </CardBody>
          </Card>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default Notes;
