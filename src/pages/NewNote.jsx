import React, { useState, useEffect } from "react";
import Modal from "styled-react-modal";

import { useActions } from "../redux";
import { useDebounce } from "../hooks";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "../components/Composer";
import * as unboundNotesActions from "../actions/notes";
import { Box, LinkButton, Icon, Text } from "../components/styles";

const StyledModel = Modal.styled`
  background-color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default function NewNote() {
  const [note, setNote] = useState({ id: null });
  const [isSaving, setIsSaving] = useState(false);
  const [body, setBody] = useState(getInitialEditorState(""));
  const debouncedBody = useDebounce(body, 800);
  const { createNote, updateNote } = useActions(unboundNotesActions);

  console.log(note);

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

    console.log(note);

    if (note.id && rawText !== note.body) {
      handleUpdateBody(rawText);
    } else if (!note.id && rawText.length > 0) {
      handleCreateNote(rawText);
    }
  }, [debouncedBody, note, updateNote, createNote]);

  return (
    <StyledModel isOpen={true}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={[0, 3]}
        p={[4, 5]}
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

      <Box width="70rem" maxWidth="100%" mx="auto">
        <Box p={4}>
          <Composer
            editorState={body}
            onChange={setBody}
            mode="complete"
            placeholder="Once upon a time and a very good time it was there was a moocow coming down along the road and this moocow that was coming down along the road met a nicens little boy named baby tuckoo..."
            height="50rem"
            fontSize={4}
            autoFocus={true}
          />
        </Box>
      </Box>
    </StyledModel>
  );
}
