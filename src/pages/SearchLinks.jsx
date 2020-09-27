import React, { useEffect, useState, useCallback } from "react";

import useQuery from "../hooks/query";
import { searchNotes } from "../api/notes";
import NoteItem from "../components/NoteItem";
import LinksChrome from "../components/LinksChrome";
import {
  Ripple,
  Box,
  Heading,
  FloatingPill,
  Paragraph
} from "../components/styles";

export default function SearchLinks() {
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const query = useQuery();
  const searchQuery = query.get("q");

  const handleSearchNotes = useCallback(async () => {
    setIsFetching(true);

    try {
      const results = await searchNotes(searchQuery);
      setResults(results.notes);
    } catch (e) {
      return;
    } finally {
      setIsFetching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearchNotes();
  }, [handleSearchNotes]);

  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        <LinksChrome withBackButton />
        <Box as="section" mb={4}>
          <Heading as="h3" fontSize={3} fontWeight="bold">
            Search
          </Heading>

          {isFetching && <Ripple />}

          <Box as="ul" flexDirection="column">
            {results.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isOpen={selectedNoteId === note.id}
                setIsOpen={setSelectedNoteId}
              />
            ))}

            {!isFetching && results.length <= 0 && (
              <Box>
                <Paragraph>
                  No results{" "}
                  <span role="img" aria-label="sad face">
                    😕
                  </span>
                </Paragraph>
              </Box>
            )}
          </Box>
        </Box>
      </FloatingPill>
    </Box>
  );
}
