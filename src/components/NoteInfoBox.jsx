import React from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Text } from "./styles";
import { Label, Action } from "./styles/InfoBox";

export default function NoteInfoBox({ note }) {
  if (!note) {
    return <Box />;
  }

  return (
    <Box>
      <Box mb={4}>
        <Label>Name</Label>
        <Heading fontFamily="sans" fontSize={4} mb="0">
          {note.name}
        </Heading>
      </Box>
      <Box mb={4}>
        <Label>URL</Label>
        <Text
          as="pre"
          fontFamily="mono"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {note.url}
        </Text>
      </Box>
      <Box>
        <Label>Tags</Label>
        <Box as="ul" mb={4}>
          {note.tags ? (
            note.tags.map((t) => <li>{t}</li>)
          ) : (
            <Text>No tags</Text>
          )}
        </Box>
      </Box>
      <Box>
        <Label>Actions</Label>
        <Box as="ul" mb={4}>
          <Action text="Pin" iconName="push_pin" />
          <Link to={`/links/${note.id}/edit`}>
            <Action text="Edit" iconName="edit" />
          </Link>
          <Action text="Delete" iconName="remove_circle" />
        </Box>
      </Box>
    </Box>
  );
}
