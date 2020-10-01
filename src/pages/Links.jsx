import React, { useEffect, useState, useCallback } from "react";

import { useActions, useSelectors } from "../redux";
import useQuery from "../hooks/query";
import * as unboundNotesActions from "../actions/notes";
import { getIsNotesFetched, getNotesByDay, getPins } from "../selectors";
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
import LinksNullState from "../components/LinksNullState";
import LinksChrome from "../components/LinksChrome";
import NoteItem from "../components/NoteItem";

export default function Links() {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const query = useQuery();
  const pageNumber = parseInt(query.get("page")) || 0;
  const filter = query.get("filter") || "";
  const { fetchNotes } = useActions(unboundNotesActions);
  const [isNotesFetched, notes, pins] = useSelectors(
    getIsNotesFetched,
    getNotesByDay,
    getPins
  );

  const handleGetNotes = useCallback(async () => {
    setIsFetching(true);

    try {
      await fetchNotes(pageNumber, filter);
    } catch (e) {
      return;
    } finally {
      setIsFetching(false);
    }
  }, [pageNumber, fetchNotes, filter]);

  useEffect(() => {
    handleGetNotes();
  }, [handleGetNotes]);

  function setSelectedPin(id) {
    if (id) {
      setSelectedNoteId(`pin.${id}`);
    } else {
      setSelectedNoteId("");
    }
  }

  function setSelectedNote(id) {
    if (id) {
      setSelectedNoteId(`note.${id}`);
    } else {
      setSelectedNoteId("");
    }
  }

  if (
    isNotesFetched &&
    !isFetching &&
    filter === "" &&
    pageNumber === 0 &&
    Object.keys(notes).length <= 0
  ) {
    return <LinksNullState />;
  }

  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        <LinksChrome onRefresh={handleGetNotes} />

        {!isNotesFetched && <Ripple />}

        {pageNumber === 0 && pins.length > 0 && (
          <Box as="section" mb={4}>
            <Heading as="h3" fontSize={3} fontWeight="bold">
              Pins
            </Heading>
            <Box as="ul" flexDirection="column">
              {pins.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isOpen={selectedNoteId === `pin.${note.id}`}
                  setIsOpen={setSelectedPin}
                />
              ))}
            </Box>
          </Box>
        )}

        {Object.entries(notes).map(([day, items]) => (
          <Box as="section" key={day} mb={4}>
            <Heading as="h3" fontSize={3} fontWeight="bold">
              {day}
            </Heading>
            <Box as="ul" flexDirection="column">
              {items.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isOpen={selectedNoteId === `note.${note.id}`}
                  setIsOpen={setSelectedNote}
                />
              ))}
            </Box>
          </Box>
        ))}

        {isNotesFetched && !isFetching && Object.keys(notes).length <= 0 && (
          <Paragraph mb={4}>There's nothing here</Paragraph>
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
