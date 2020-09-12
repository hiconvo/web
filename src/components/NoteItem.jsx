import React from "react";
import { useParams } from "react-router-dom";
import "styled-components/macro";

import { Text, Box, Icon, Button } from "../components/styles";

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

function Expando() {
  return (
    <Button ml={1} backgroundColor="lightGray" p={1} borderRadius="0.8rem">
      <Icon name="menu" />
    </Button>
  );
}

export default function NoteItem({ note }) {
  const { id } = useParams();
  const isSelected = id === note.id;

  return (
    <Box as="li" py={2} flexDirection="row" width="100%">
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
          <Text fontSize={3} fontWeight={isSelected ? "semiBold" : "normal"}>
            {note.name}
          </Text>
        </Box>
        <Expando />
      </Box>
    </Box>
  );
}
