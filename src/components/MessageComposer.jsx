import React from "react";

import useFormik from "../hooks/formik";
import { FloatingPill } from "./styles";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";
import * as unboundActions from "../actions/messages";
import * as unboundNotifActions from "../actions/notifications";
import Controls from "./MessageComposerControls";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";

const validate = values => {
  return getTextFromEditorState(values.body).length <= 0
    ? { message: "Your message cannot be empty" }
    : null;
};

export default function MessageComposer() {
  const [{ id: threadId }] = useSelectors(getSelectedResource);
  const { createThreadMessage } = useActions(unboundActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const formik = useFormik({
    formId: threadId,
    initialValues: { body: getInitialEditorState() },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      try {
        setSubmitting(true);
        await createThreadMessage(threadId, {
          body: getTextFromEditorState(values.body)
        });
        formik.setFieldValue("body", getInitialEditorState());
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <FloatingPill>
      <Composer
        backgroundColor="white"
        placeholder="Compose your response..."
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
  );
}
