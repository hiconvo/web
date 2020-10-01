import React, { useState, useEffect } from "react";
import "styled-components/macro";
import Modal from "styled-react-modal";

import { useActions } from "../redux";
import { useDebounce } from "../hooks";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import * as unboundNotesActions from "../actions/notes";
import { Box, LinkButton, Icon, Text } from "./styles";

const StyledModel = Modal.styled`
  background-color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
`;

export default function NoteComposer({ note: noteProp = { id: null } }) {
  const [note, setNote] = useState(noteProp);
  const [isSaving, setIsSaving] = useState(false);
  const [body, setBody] = useState(
    getInitialEditorState((noteProp && noteProp.body) || "")
  );
  const debouncedBody = useDebounce(body, 1000);
  const { createNote, updateNote } = useActions(unboundNotesActions);

  useEffect(() => {
    async function handleUpdateBody(body) {
      setIsSaving(true);

      try {
        await updateNote({ id: note.id, body });
      } catch (e) {
        return;
      } finally {
        setIsSaving(false);
      }
    }

    async function handleCreateNote(body) {
      setIsSaving(true);

      try {
        const note = await createNote({ body });
        setNote(note);
      } catch (e) {
        return;
      } finally {
        setIsSaving(false);
      }
    }

    const rawText = getTextFromEditorState(debouncedBody);

    if (note.id && rawText !== note.body) {
      handleUpdateBody(rawText);
    } else if (!note.id && rawText.length > 0) {
      handleCreateNote(rawText);
    }
  }, [debouncedBody, note, updateNote, createNote]);

  return (
    <StyledModel isOpen={true}>
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={[0, 3]}
        p={[4, 5]}
        zIndex="100"
        css={{
          background:
            "linear-gradient(#fff 20%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0))"
        }}
      >
        <LinkButton variant="action" to="/links">
          <Icon name="chevron_left" mr={2} />
          <Text color="inherit">Back</Text>
        </LinkButton>
        <Box>
          <Text color="gray">
            {isSaving ? "Saving" : note.id ? "Saved" : "Not saved"}
          </Text>
        </Box>
      </Box>

      <Box width="80rem" maxWidth="100%" mx="auto" py={["8rem", "18rem"]}>
        <Box p={4}>
          <Composer
            editorState={body}
            onChange={setBody}
            mode="complete"
            placeholder="The first line is the title. To make a line into a heading, prefix it with one or more hashes #. Surround text in asterisks for *bold* and underscores for _italic_."
            height="10rem"
            fontSize={4}
            autoFocus={true}
          />
        </Box>
      </Box>
    </StyledModel>
  );
}
