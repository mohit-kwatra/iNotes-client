import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { validations } from "../validations";
import { AnimatePresence } from "framer-motion";
import InputError from "./InputError";

const EditNoteDialog = ({ isOpen, onClose, action, note }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const initialRef = useRef();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const onInputChange = (e) => {
    const formValues = getValues();
    if (
      formValues.title !== note.title ||
      formValues.description !== note.description
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const titleValidations = {
    ...validations.note.title.targetObj,
    onChange: onInputChange,
  };
  const descValidations = {
    ...validations.note.description.targetObj,
    onChange: onInputChange,
  };

  const onModalClose = () => {
    setValue("title", note.title, { shouldValidate: true });
    setValue("description", note.description, { shouldValidate: true });
    setIsDisabled(true);
    onClose();
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="note-edit-title">Title</FormLabel>
            <Input
              id="note-edit-title"
              type="text"
              variant="filled"
              defaultValue={note.title}
              {...register(validations.note.title.name, titleValidations)}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.title && <InputError message={errors.title.message} />}
            </AnimatePresence>
            <FormLabel htmlFor="note-edit-description" mt={2}>
              Description
            </FormLabel>
            <Textarea
              id="note-edit-description"
              size="md"
              resize="none"
              variant="filled"
              defaultValue={note.description}
              {...register(validations.note.description.name, descValidations)}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.description && (
                <InputError message={errors.description.message} />
              )}
            </AnimatePresence>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button ref={initialRef} onClick={onModalClose}>
            Close
          </Button>
          {!isDisabled ? (
            <Button
              isLoading={isLoading}
              colorScheme="blue"
              ml={3}
              onClick={handleSubmit((data) => action(data, setIsLoading))}
            >
              Edit
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              bg="blue.600"
              color="gray.400"
              cursor="not-allowed"
              ml={3}
              _active={{}}
            >
              Edit
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditNoteDialog;
