import React from "react";
import "styled-components/macro";
import css from "@styled-system/css";

import NoteItemEditor from "./NoteItemEditor";
import { Text, Box, Icon, Button } from "../components/styles";
import Bullet from "./NoteBullet";

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

export default function NoteItem({ note, isOpen, setIsOpen }) {
  const isLink = note && note.url;

  function toggleOpen() {
    setIsOpen(!isOpen && note.id);
  }

  return (
    <Box as="li" py={2} width="100%" mb={isOpen ? 2 : 0}>
      <Box flexDirection="row" width="100%" alignItems="center">
        <Bullet favicon={note.favicon} isLink={isLink} />
        <Box
          width="calc(100% - 2rem)"
          overflow="visible"
          flexDirection="row"
          alignItems="center"
        >
          {isLink ? (
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
              <Text fontWeight={isOpen ? "semiBold" : "normal"}>
                {note.name}
              </Text>
            </Box>
          ) : (
            <Box
              display="block"
              role="button"
              border="none"
              p="0"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              width="100%"
              cursor="pointer"
              onClick={toggleOpen}
            >
              <Text fontWeight={isOpen ? "semiBold" : "normal"}>
                {note.name}
              </Text>
            </Box>
          )}
          <Expando onClick={toggleOpen} isOpen={isOpen} />
        </Box>
      </Box>
      {isOpen && <NoteItemEditor note={note} onClose={toggleOpen} />}
    </Box>
  );
}
