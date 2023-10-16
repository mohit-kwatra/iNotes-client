import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { NoteContext } from "../contexts/NoteContext";
import { reducerCases } from "../contexts/NoteReducer";
import { AuthContext } from "../contexts/AuthContext";
import InputError from "./InputError";
import { validations } from "../validations";

const AddNoteForm = () => {
  const dispatch = useContext(NoteContext)[1];
  const { token } = useContext(AuthContext)[0];

  const toast = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const bg = useColorModeValue("whiteAlpha.800", "gray.800");

  const onSubmit = (data) => {
    setIsSubmitting(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notes/add`, data, {
        headers: {
          "Auth-Token": token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsSubmitting(false);
        reset({
          title: "",
          description: "",
        });
        if (res.data.statusText === "SUCCESS") {
          dispatch({ type: reducerCases.addNote, payload: res.data.note });
          toast({
            title: "Note Created.",
            description: "Your note is created.",
            status: "success",
            variant: "top-accent",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((axiosError) => {
        setIsSubmitting(false);
        console.log(axiosError);
        toast({
          title: "Something Went Wrong.",
          description: "Some errors occurred while creating your note.",
          status: "error",
          variant: "top-accent",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <FormControl
      w={["100%", null, "90%", null, "80%"]}
      bg={bg}
      p="2rem"
      rounded="lg"
      shadow="lg"
    >
      <Heading size="md">Add Note</Heading>
      <Box my={5}>
        <FormLabel htmlFor="note-title">Note Title</FormLabel>
        <Input
          id="note-title"
          type="text"
          variant="filled"
          {...register(
            validations.note.title.name,
            validations.note.title.targetObj
          )}
        />
        <AnimatePresence mode="wait" initial={false}>
          {errors.title && <InputError message={errors.title.message} />}
        </AnimatePresence>
        <FormLabel htmlFor="note-description" mt={2}>
          Note Description
        </FormLabel>
        <Textarea
          id="note-description"
          size="md"
          resize="none"
          variant="filled"
          {...register(
            validations.note.description.name,
            validations.note.description.targetObj
          )}
        />
        <AnimatePresence mode="wait" initial={false}>
          {errors.description && (
            <InputError message={errors.description.message} />
          )}
        </AnimatePresence>
      </Box>
      <Button
        isLoading={isSubmitting}
        colorScheme="blue"
        onClick={handleSubmit(onSubmit)}
      >
        Add Note
      </Button>
    </FormControl>
  );
};

export default AddNoteForm;
