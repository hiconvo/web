import React, { useState, useEffect } from "react";
import "styled-components/macro";
import { useHistory } from "react-router-dom";

import { useDebounce } from "../hooks";
import { useActions } from "../redux";
import * as unboundActions from "../actions/notes";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import { Text, Box, IconButton } from "../components/styles";

export default function NoteItemEditor({ note, onClose }) {
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [body, setBody] = useState(getInitialEditorState(note.body));
  const { deleteNote, updateNote } = useActions(unboundActions);
  const debouncedBody = useDebounce(body, 800);
  const isLink = note && note.url;

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

    const rawText = getTextFromEditorState(debouncedBody);

    if (rawText !== note.body) {
      handleUpdateBody(rawText);
    }
  }, [debouncedBody, note, updateNote]);

  async function handleDeleteNote() {
    try {
      await deleteNote({ note });
    } catch {
      return;
    }
  }

  async function handlePinNote() {
    try {
      await updateNote({ id: note.id, pin: !note.pin });
    } catch {
      return;
    }
  }

  return (
    <Box ml="2.8rem" mt={3} width="calc(100% - 2.8rem)">
      <Box as="ul" flexDirection="row">
        <li>
          <IconButton
            iconName="delete"
            text="Delete"
            mr={2}
            onClick={handleDeleteNote}
          />
        </li>
        <li>
          <IconButton
            iconName="edit"
            text="Edit"
            mr={2}
            onClick={() =>
              history.push(
                isLink ? `/links/${note.id}/edit` : `/notes/${note.id}`
              )
            }
          />
        </li>
        <li>
          <IconButton
            iconName="push_pin"
            text={note.pin ? "Unpin" : "Pin"}
            mr={2}
            onClick={handlePinNote}
          />
        </li>
        <li>
          <IconButton iconName="close" text="Close" onClick={onClose} />
        </li>
      </Box>
      <Box width="100%" maxWidth="70rem">
        <Composer
          editorState={body}
          onChange={setBody}
          backgroundColor="gray"
          placeholder="Add a note..."
        />
      </Box>
      <Box mt={3}>
        <Text color="gray" fontSize={1}>
          {isSaving ? "Saving..." : "Saved"}
        </Text>
      </Box>
    </Box>
  );
}
