import React, { useEffect, useState } from "react";

import { useActions, useSelectors } from "../redux";
import useQuery from "../hooks/query";
import * as unboundNotesActions from "../actions/notes";
import { getIsNotesFetched, getNotesByDay } from "../selectors";
import {
  Ripple,
  Text,
  Box,
  Heading,
  FloatingPill,
  LinkButton,
  Icon,
  Paragraph
} from "../components/styles";
import NoteItem from "../components/NoteItem";

export default function Links() {
  const [isFetching, setIsFetching] = useState(false);
  const query = useQuery();
  const pageNumber = parseInt(query.get("page")) || 0;
  const { fetchNotes } = useActions(unboundNotesActions);
  const [isNotesFetched, notes] = useSelectors(
    getIsNotesFetched,
    getNotesByDay
  );

  useEffect(() => {
    async function handleGetNotes() {
      setIsFetching(true);

      try {
        await fetchNotes(pageNumber);
      } catch (e) {
        return;
      } finally {
        setIsFetching(false);
      }
    }

    handleGetNotes();
  }, [pageNumber, fetchNotes]);

  if (
    isNotesFetched &&
    !isFetching &&
    pageNumber === 0 &&
    Object.keys(notes).length <= 0
  ) {
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
        {isNotesFetched && !isFetching && Object.keys(notes).length <= 0 && (
          <Paragraph>There's nothing here</Paragraph>
        )}
        {isNotesFetched && (
          <Box flexDirection="row" mb={3}>
            <LinkButton
              variant="action"
              mr={2}
              to={`/links?page=${Math.max(pageNumber - 1, 0)}`}
            >
              <Icon name="chevron_left" />
              <Text fontWeight="semiBold">Newer</Text>
            </LinkButton>
            <LinkButton variant="action" to={`/links?page=${pageNumber + 1}`}>
              <Text fontWeight="semiBold">Older</Text>
              <Icon name="chevron_right" />
            </LinkButton>
          </Box>
        )}
      </FloatingPill>
    </Box>
  );
}
