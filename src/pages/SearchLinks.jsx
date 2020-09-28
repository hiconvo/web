import React, { useEffect, useState, useCallback } from "react";
import { useRouteMatch } from "react-router";

import useQuery from "../hooks/query";
import { searchNotes, getNotes } from "../api/notes";
import NoteItem from "../components/NoteItem";
import LinksChrome from "../components/LinksChrome";
import {
  Ripple,
  Box,
  Heading,
  FloatingPill,
  Paragraph
} from "../components/styles";
import { upperFirstLetter } from "../utils";

export default function SearchLinks() {
  const isSearchPage = useRouteMatch("/links/search");
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const query = useQuery();
  const searchQuery = query.get("q") || "";
  const tag = query.get("tag") || "";

  const handleFetchNotes = useCallback(async () => {
    setIsFetching(true);

    let func, args;
    if (searchQuery) {
      func = searchNotes;
      args = [searchQuery];
    } else if (tag) {
      func = getNotes;
      args = [0, "", tag];
    }

    try {
      const results = await func(...args);
      setResults(results.notes);
    } catch (e) {
      return;
    } finally {
      setIsFetching(false);
    }
  }, [searchQuery, tag]);

  useEffect(() => {
    handleFetchNotes();
  }, [handleFetchNotes]);

  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        <LinksChrome
          withBackButton={isSearchPage}
          onRefresh={isSearchPage ? null : handleFetchNotes}
        />
        <Box as="section" mb={4}>
          <Heading as="h3" fontSize={3} fontWeight="bold">
            {tag ? upperFirstLetter(tag) : "Search"}
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
