import React from "react";

import { useSelectors } from "../redux";
import { getIsNotesFetched, getNotesByDay } from "../selectors";
import { Ripple, Text, Box, Heading, FloatingPill } from "../components/styles";
import NoteItem from "../components/NoteItem";

export default function Links() {
  const [isNotesFetched, notes] = useSelectors(
    getIsNotesFetched,
    getNotesByDay
  );

  if (isNotesFetched && Object.keys(notes).length <= 0) {
    return (
      <div>
        <Text>Null state</Text>
      </div>
    );
  }

  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        {!isNotesFetched && <Ripple />}
        {Object.entries(notes).map(([day, items]) => (
          <Box as="section" key={day} mb={4}>
            <Heading as="h3" fontSize={3} fontWeight="bold">
              {day}
            </Heading>
            <Box as="ul" flexDirection="column">
              {items.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </Box>
          </Box>
        ))}
      </FloatingPill>
    </Box>
  );
}
