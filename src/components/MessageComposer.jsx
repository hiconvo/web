import React from "react";
import { useFormik } from "formik";

import { FloatingPill } from "./styles";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";
import * as unboundActions from "../actions/messages";
import Controls from "./MessageComposerControls";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";

export default function MessageComposer() {
  const [{ id: threadId }] = useSelectors(getSelectedResource);
  const { createThreadMessage } = useActions(unboundActions);
  const formik = useFormik({
    initialValues: { body: getInitialEditorState() },
    onSubmit: (values, { setSubmitting }) =>
      createThreadMessage(threadId, {
        body: getTextFromEditorState(values.body)
      })
        .then(() => {
          formik.setFieldValue("body", getInitialEditorState());
        })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
        })
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
