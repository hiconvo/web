import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NoteComposer from "../components/NoteComposer";
import { useActions } from "../redux";
import * as unboundNotesActions from "../actions/notes";
import { Text, Box, Ripple, CenterContent } from "../components/styles";
import { errorToString } from "../utils";

export default function Note() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchNote } = useActions(unboundNotesActions);
  const [note, setNote] = useState(null);

  useEffect(() => {
    async function handleFetchNote() {
      if (id && !note) {
        try {
          const nn = await fetchNote(id);
          setNote(nn);
        } catch (e) {
          setErrorMessage(errorToString(e));
        }
      }
    }

    handleFetchNote();
  }, [id, fetchNote, note]);

  if (!note) {
    return (
      <CenterContent>
        <Box maxWidth="70rem" p={3}>
          {errorMessage ? (
            <Text fontSize={3} textAlign="center">
              {errorMessage}
            </Text>
          ) : (
            <Ripple />
          )}
        </Box>
      </CenterContent>
    );
  }

  return <NoteComposer note={note} />;
}
