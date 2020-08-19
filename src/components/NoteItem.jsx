import React from "react";
import styled from "styled-components";

import { Text, Box } from "../components/styles";

const Name = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

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

export default function NoteItem({ note }) {
  return (
    <Box as="li" py={2} flexDirection="row" width="100%">
      <Bullet favicon={note.favicon} />
      <Box width="calc(100% - 2rem)" overflow="hidden">
        <Name href={note.url} target="_blank">
          <Text fontSize={3}>{note.name}</Text>
        </Name>
      </Box>
    </Box>
  );
}
