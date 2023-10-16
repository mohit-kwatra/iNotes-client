import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import DeleteNoteDialog from "./DeleteNoteDialog";
import EditNoteDialog from "./EditNoteDialog";

const Note = ({ note, deleteNote, editNote }) => {
  const deleteNoteDialog = useDisclosure();
  const editNoteDialog = useDisclosure();
  const bg = useColorModeValue("whiteAlpha.800", "gray.800");

  const actionDeleteNote = (setIsLoading) => {
    deleteNote(note._id, deleteNoteDialog.onClose, setIsLoading);
  };

  const actionEditNote = (data, setIsLoading) => {
    editNote(note._id, editNoteDialog.onClose, data, setIsLoading);
  };

  return (
    <>
      <Card direction="row" overflow="hidden" bg={bg} shadow="md">
        <CardBody>
          <Heading size="sm" mb={1}>
            {note.title}
          </Heading>
          <Text>{note.description}</Text>
        </CardBody>
        <Divider orientation="vertical" />
        <CardFooter>
          <VStack justify="center" align="center">
            <Tooltip hasArrow label="Edit Note" placement="right">
              <IconButton
                aria-label="Edit Note"
                icon={<EditIcon />}
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={editNoteDialog.onOpen}
              />
            </Tooltip>
            <Tooltip hasArrow label="Delete Note" placement="right">
              <IconButton
                aria-label="Delete Note"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={deleteNoteDialog.onOpen}
              />
            </Tooltip>
          </VStack>
        </CardFooter>
      </Card>

      <DeleteNoteDialog
        isOpen={deleteNoteDialog.isOpen}
        onClose={deleteNoteDialog.onClose}
        action={actionDeleteNote}
      />
      <EditNoteDialog
        isOpen={editNoteDialog.isOpen}
        onClose={editNoteDialog.onClose}
        action={actionEditNote}
        note={note}
      />
    </>
  );
};

export default Note;
