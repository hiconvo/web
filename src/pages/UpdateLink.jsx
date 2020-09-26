import React from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router";

import { useSelectors } from "../redux";
import useFormik from "../hooks/formik";
import { useActions } from "../redux";
import { getNoteById } from "../selectors";
import * as unboundNoteActions from "../actions/notes";
import * as unboundNotifActions from "../actions/notifications";
import {
  Heading,
  Text,
  Input,
  Box,
  Ripple,
  CenterContent,
  LinkButton,
  Button
} from "../components/styles";

const Container = styled.div`
  max-width: 80rem;
  margin: auto;
`;

export default function UpdateLink() {
  const history = useHistory();
  const { id } = useParams();
  const [note] = useSelectors(getNoteById(id));
  const { updateNote, deleteNote } = useActions(unboundNoteActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const formik = useFormik({
    formId: undefined,
    initialValues: {
      name: (note && note.name) || "",
      body: (note && note.body) || "",
      url: (note && note.url) || "",
      favicon: (note && note.favicon) || ""
    },
    validate: (payload) => {
      if (!payload.name) {
        return { message: "Please give your link a name" };
      } else if (!payload.url) {
        return { message: "Please give your link a URL" };
      }
    },
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      setSubmitting(true);

      try {
        await updateNote({ id: note.id, ...values });
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }

      history.push(`/links`);
    }
  });

  async function handleDeleteNote() {
    try {
      await deleteNote({ note });
    } catch {
      return;
    }

    history.push(`/links`);
  }

  if ((id && !note) || !formik.values) {
    return (
      <CenterContent>
        <Ripple />
      </CenterContent>
    );
  }

  return (
    <Container>
      <Heading fontSize={4} color="darkGray">
        Update link
      </Heading>
      <Box>
        <Input
          autoFocus
          type="text"
          name="Name"
          tabIndex="1"
          value={formik.values.name}
          onChange={formik.handleChange}
          isDisabled={formik.isSubmitting}
          required
          maxLength="255"
          fontSize={2}
          placeholder="Give your link a name"
        />
        <Input
          type="text"
          name="URL"
          tabIndex="2"
          value={formik.values.url}
          onChange={formik.handleChange}
          isDisabled={formik.isSubmitting}
          required
          maxLength="1023"
          fontSize={2}
          placeholder="https://convo.events"
          fontFamily="mono"
        />
        <Input
          type="text"
          name="Favicon"
          tabIndex="3"
          value={formik.values.favicon}
          onChange={formik.handleChange}
          isDisabled={formik.isSubmitting}
          maxLength="1023"
          fontSize={2}
          placeholder="https://convo.events/favicon.ico"
          fontFamily="mono"
        />
        <Box justifyContent="space-between" flexDirection="row" mt={3} mb={5}>
          <Box>
            <Button variant="secondary" onClick={handleDeleteNote}>
              <Text fontWeight="inherit" color="inherit">
                Delete
              </Text>
            </Button>
          </Box>
          <Box flexDirection="row">
            <LinkButton to="/links" variant="secondary">
              Cancel
            </LinkButton>

            <Button
              variant="primary"
              type="submit"
              tabIndex="5"
              onClick={formik.handleSubmit}
              isLoading={formik.isSubmitting}
              ml="1rem"
              width="16rem"
            >
              <Text fontWeight="inherit" color="inherit">
                Save
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
