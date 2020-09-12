import React, { useState } from "react";
import "styled-components/macro";
import { useHistory } from "react-router-dom";

import Composer, { getInitialEditorState } from "./Composer";
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

function Expando({ onClick }) {
  return (
    <Button
      ml={1}
      backgroundColor="lightGray"
      p={1}
      borderRadius="0.8rem"
      onClick={onClick}
    >
      <Icon name="menu" />
    </Button>
  );
}

export default function NoteItem({ note }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState(getInitialEditorState(note.body));

  function toggleOpen() {
    setIsOpen(!isOpen);
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
          <Expando onClick={toggleOpen} />
        </Box>
      </Box>
      {isOpen && (
        <Box ml="2.8rem" mt={3} width="calc(100% - 2.8rem)">
          <Box as="ul" flexDirection="row">
            <IconButton iconName="delete" text="Delete" mr={2} />
            <IconButton
              iconName="edit"
              text="Edit"
              mr={2}
              onClick={() => history.push(`/links/${note.id}/edit`)}
            />
            <IconButton iconName="push_pin" text="Pin" mr={2} />
            <IconButton iconName="close" text="Close" onClick={toggleOpen} />
          </Box>
          <Box width="100%">
            <Composer
              editorState={body}
              onChange={setBody}
              backgroundColor="gray"
              placeholder="Add a note..."
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
