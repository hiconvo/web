import React, { useState, useEffect } from "react";
import "styled-components/macro";
import { useHistory } from "react-router-dom";

import { useDebounce } from "../hooks";
import { useActions } from "../redux";
import * as unboundActions from "../actions/notes";
import { loginUserWithToken } from "../actions/auth";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import TaggingEditor from "../components/TaggingEditor";
import { Text, Box, IconButton } from "../components/styles";

export default function NoteItemEditor({ note, onClose }) {
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [body, setBody] = useState(getInitialEditorState(note.body));
  const [tags, setTags] = useState(note.tags || []);
  const { deleteNote, updateNote, getUser } = useActions({
    getUser: loginUserWithToken,
    ...unboundActions
  });
  const debouncedBody = useDebounce(body, 1400);
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

  async function handleUpdateTags(newTags) {
    if (isSaving) return;

    setIsSaving(true);

    try {
      await updateNote({ id: note.id, tags: newTags });
      await getUser();
    } catch (e) {
      return;
    } finally {
      setIsSaving(false);
    }

    setTags(newTags);
  }

  async function handleDeleteNote() {
    setIsSaving(true);

    try {
      await deleteNote({ note });
    } catch {
      setIsSaving(false);
      return;
    }
  }

  async function handlePinNote() {
    setIsSaving(true);

    try {
      await updateNote({ id: note.id, pin: !note.pin });
    } catch {
      return;
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Box ml="2.8rem" mt={3} width="calc(100% - 2.8rem)">
      <Box as="ul" flexDirection="row">
        <li>
          <IconButton
            mobileHideText={true}
            iconName="delete"
            text="Delete"
            mr={2}
            onClick={handleDeleteNote}
            disabled={isSaving}
          />
        </li>
        <li>
          <IconButton
            mobileHideText={true}
            iconName="edit"
            text="Edit"
            mr={2}
            disabled={isSaving}
            onClick={() =>
              history.push(
                isLink ? `/links/${note.id}/edit` : `/notes/${note.id}`
              )
            }
          />
        </li>
        <li>
          <IconButton
            mobileHideText={true}
            iconName="push_pin"
            text={note.pin ? "Unpin" : "Pin"}
            mr={2}
            disabled={isSaving}
            onClick={handlePinNote}
          />
        </li>
        {isLink && (
          <li>
            <IconButton
              mobileHideText={true}
              iconName="share"
              text="Share"
              mr={2}
              onClick={() =>
                history.push(`/convos/new?link=${encodeURIComponent(note.url)}`)
              }
            />
          </li>
        )}
        <li>
          <IconButton
            mobileHideText={true}
            iconName="menu_open"
            text="Close"
            disabled={isSaving}
            onClick={onClose}
          />
        </li>
      </Box>
      <Box width="100%" maxWidth="70rem">
        <Composer
          editorState={body}
          onChange={setBody}
          mode="complete"
          backgroundColor="gray"
          placeholder="Add a note..."
        />
      </Box>
      <Box
        mt={2}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        maxWidth="70rem"
        width="100%"
      >
        <TaggingEditor tags={tags} setTags={handleUpdateTags} />
        <Text color="gray" fontSize={1}>
          {isSaving ? "Saving..." : "Saved"}
        </Text>
      </Box>
    </Box>
  );
}
