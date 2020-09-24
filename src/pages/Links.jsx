import React, { useEffect, useState, useCallback } from "react";

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
  IconButton,
  Icon,
  Paragraph
} from "../components/styles";
import LinksNullState from "../components/LinksNullState";
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

  const handleGetNotes = useCallback(async () => {
    setIsFetching(true);

    try {
      await fetchNotes(pageNumber);
    } catch (e) {
      return;
    } finally {
      setIsFetching(false);
    }
  }, [pageNumber, fetchNotes]);

  useEffect(() => {
    handleGetNotes();
  }, [handleGetNotes]);

  if (
    isNotesFetched &&
    !isFetching &&
    pageNumber === 0 &&
    Object.keys(notes).length <= 0
  ) {
    return <LinksNullState />;
  }

  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        <Box flexDirection="row" justifyContent="space-between" mb={4}>
          <Box flexDirection="row" justifyContent="flex-start">
            <IconButton iconName="search" text="Search" mr={2} />
            <IconButton iconName="filter_alt" text="Filter" mr={2} />
            <IconButton
              iconName="refresh"
              text="Refresh"
              onClick={handleGetNotes}
              mr={2}
            />
          </Box>
          <Box>
            <LinkButton variant="action" to="/notes/new">
              <Icon name="edit" mr={2} />
              <Text color="inherit">New Note</Text>
            </LinkButton>
          </Box>
        </Box>
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
              <Text>Newer</Text>
            </LinkButton>
            <LinkButton variant="action" to={`/links?page=${pageNumber + 1}`}>
              <Text>Older</Text>
              <Icon name="chevron_right" />
            </LinkButton>
          </Box>
        )}
      </FloatingPill>
    </Box>
  );
}
