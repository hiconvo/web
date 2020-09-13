import React, { useState, useEffect } from "react";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import css from "@styled-system/css";

import { useDebounce } from "../hooks";
import { useActions } from "../redux";
import * as unboundActions from "../actions/notes";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import { Text, Box, Icon, Button } from "../components/styles";

function IconButton({ iconName, text, ...rest }) {
  return (
    <li>
      <Button variant="action" {...rest}>
        <Icon name={iconName} mr={2} color="inherit" />
        <Text fontWeight="inherit" color="inherit">
          {text}
        </Text>
      </Button>
    </li>
  );
}

function Bullet({ favicon }) {
  return (
    <Box
      height="2rem"
      width="2rem"
      justifyContent="center"
      alignItems="center"
      flexShrink="0"
      mr={2}
    >
      {favicon ? (
        <Box as="img" height="100%" width="100%" src={favicon} />
      ) : (
        <Box dangerouslySetInnerHTML={{ __html: "&#x1F30F" }} />
      )}
    </Box>
  );
}

function Expando({ onClick, isOpen }) {
  return (
    <Button
      ml={1}
      backgroundColor="lightGray"
      p={1}
      borderRadius="0.8rem"
      css={css({ "&:hover": { "background-color": "gray" } })}
      onClick={onClick}
    >
      <Icon name={isOpen ? "menu_open" : "menu"} />
    </Button>
  );
}

export default function NoteItem({ note }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [body, setBody] = useState(getInitialEditorState(note.body));
  const { deleteNote, updateNote } = useActions(unboundActions);
  const debouncedBody = useDebounce(body, 800);

  useEffect(() => {
    async function handleUpdateBody(body) {
      setIsSaving(true);

      try {
        await updateNote({ id: note.id, body });
      } catch (e) {
        return;
      } finally {
        setIsSaving(false);
      }
    }

    const rawText = getTextFromEditorState(debouncedBody);

    if (isOpen && rawText !== note.body) {
      handleUpdateBody(rawText);
    }
  }, [isOpen, debouncedBody, note]);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  async function handleDeleteNote() {
    try {
      await deleteNote({ note });
    } catch {
      return;
    }

    setIsOpen(false);
  }

  async function handlePinNote() {
    try {
      await updateNote({ id: note.id, pin: !note.pin });
    } catch {
      return;
    }
  }

  return (
    <Box as="li" py={2} width="100%" mb={isOpen ? 2 : 0}>
      <Box flexDirection="row" width="100%" alignItems="center">
        <Bullet favicon={note.favicon} />
        <Box
          width="calc(100% - 2rem)"
          overflow="hidden"
          flexDirection="row"
          alignItems="center"
        >
          <Box
            as="a"
            href={note.url}
            target="_blank"
            display="block"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            css={{ "&:hover": { "text-decoration": "underline" } }}
          >
            <Text fontWeight={isOpen ? "semiBold" : "normal"}>{note.name}</Text>
          </Box>
          <Expando onClick={toggleOpen} isOpen={isOpen} />
        </Box>
      </Box>
      {isOpen && (
        <Box ml="2.8rem" mt={3} width="calc(100% - 2.8rem)">
          <Box as="ul" flexDirection="row">
            <IconButton
              iconName="delete"
              text="Delete"
              mr={2}
              onClick={handleDeleteNote}
            />
            <IconButton
              iconName="edit"
              text="Edit"
              mr={2}
              onClick={() => history.push(`/links/${note.id}/edit`)}
            />
            <IconButton
              iconName="push_pin"
              text={note.pin ? "Unpin" : "Pin"}
              mr={2}
              onClick={handlePinNote}
            />
            <IconButton iconName="close" text="Close" onClick={toggleOpen} />
          </Box>
          <Box width="100%" maxWidth="70rem">
            <Composer
              editorState={body}
              onChange={setBody}
              backgroundColor="gray"
              placeholder="Add a note..."
            />
          </Box>
          <Box mt={3}>
            <Text color="gray" fontSize={1}>
              {isSaving ? "Saving..." : "Saved"}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
