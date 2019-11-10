import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router";

import useFormik from "../hooks/formik";
import { getUser } from "../api/user";
import { Text, FloatingPill } from "./styles";
import { Container, Label, Input } from "./styles/CreateForm";
import RegisterWarning from "../components/RegisterWarning";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import Controls from "./MessageComposerControls";
import MultiMemberPickerField from "./MultiMemberPickerField";
import { useActions } from "../redux";
import * as unboundActions from "../actions/threads";
import * as unboundGeneralActions from "../actions/general";
import * as unboundNotifActions from "../actions/notifications";

const validate = values => {
  if (values.members.length <= 0) {
    return {
      message: "You need to add at least one member"
    };
  } else if (getTextFromEditorState(values.body).length <= 0) {
    return { message: "Your message cannot be empty" };
  } else {
    return null;
  }
};

export default function ThreadForm() {
  const subjectEl = useRef(null);
  const history = useHistory();
  const { createThread } = useActions(unboundActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const { setSelectedResource } = useActions(unboundGeneralActions);
  const formik = useFormik({
    formId: "newThread",
    initialValues: {
      body: getInitialEditorState(),
      subject: "",
      members: []
    },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      let thread;
      try {
        setSubmitting(true);
        thread = await createThread({
          subject: values.subject,
          users: values.members,
          body: getTextFromEditorState(values.body)
        });
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }

      setSelectedResource(thread.id);
      history.push("/convos");
    }
  });

  useEffect(() => {
    subjectEl.current.focus();

    if (history.location && history.location.search) {
      const [, id] = history.location.search.match(/\?userId=(.+)/);
      getUser(id).then(user => formik.setFieldValue("members", [user]));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <RegisterWarning />
      <FloatingPill>
        <Label>
          <Text fontSize={1} mr={1}>
            Subject:
          </Text>
          <Input
            type="text"
            placeholder="Give your Convo a subject"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            ref={subjectEl}
            required
            maxLength="255"
            fontSize={2}
          />
        </Label>

        <Label>
          <Text fontSize={1} mr={1}>
            To:
          </Text>
          <MultiMemberPickerField
            members={formik.values.members}
            setMembers={members => formik.setFieldValue("members", members)}
          />
        </Label>

        <Composer
          placeholder="Compose your message..."
          backgroundColor="gray"
          height="16rem"
          editorState={formik.values.body}
          onChange={body => formik.setFieldValue("body", body)}
          isDisabled={formik.isSubmitting}
        />
        <Controls
          editorState={formik.values.body}
          onClick={formik.handleSubmit}
          isDisabled={formik.isSubmitting}
        />
      </FloatingPill>
    </Container>
  );
}
