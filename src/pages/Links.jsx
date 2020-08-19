import React from "react";

import { useSelectors } from "../redux";
import { getIsNotesFetched, getNotesByDay } from "../selectors";
import { Ripple, Text, Box, Heading } from "../components/styles";
import { ContainerDualSidebars } from "./styles";
import NoteItem from "../components/NoteItem";

export default function Links() {
  const [isNotesFetched, notes] = useSelectors(
    getIsNotesFetched,
    getNotesByDay
  );

  if (isNotesFetched && notes.length <= 0) {
    return (
      <div>
        <Text>Null state</Text>
      </div>
    );
  }

  return (
    <ContainerDualSidebars>
      <Box />
      <Box>
        {!isNotesFetched && <Ripple />}
        {Object.entries(notes).map(([day, items]) => (
          <Box as="section">
            <Heading as="h3" fontSize={4} fontWeight="semiBold">
              {day}
            </Heading>
            <Box as="ul" flexDirection="column">
              {items.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box />
    </ContainerDualSidebars>
  );
}
