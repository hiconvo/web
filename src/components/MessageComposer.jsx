import React, { useState, useRef } from "react";
import imageFileToBase64 from "image-file-to-base64-exif";

import useFormik from "../hooks/formik";
import { FloatingPill } from "./styles";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";
import * as unboundActions from "../actions/messages";
import * as unboundNotifActions from "../actions/notifications";
import Controls from "./MessageComposerControls";
import MessageImagePreview from "./MessageImagePreview";
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
  const inputEl = useRef(null);
  const [src, setSrc] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);
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
          body: getTextFromEditorState(values.body),
          blob: src.length ? src.split(",").pop() : ""
        });
        formik.setFieldValue("body", getInitialEditorState());
        setSrc("");
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }
    }
  });

  function handlePhotoClick(e) {
    e.preventDefault();
    inputEl.current && inputEl.current.click();
  }

  async function handleFileSelection(e) {
    const [file] = e.target.files;
    setIsImgLoading(true);
    const src = await imageFileToBase64(file, 2048, 2048, 85);
    setSrc(src);
    setIsImgLoading(false);
  }

  function handleClearImage() {
    setSrc("");
  }

  return (
    <FloatingPill>
      <Composer
        backgroundColor="white"
        placeholder="Compose your response..."
        editorState={formik.values.body}
        onChange={body => formik.setFieldValue("body", body)}
        isDisabled={formik.isSubmitting}
      />
      <MessageImagePreview src={src} onClick={handleClearImage} />
      <Controls
        onPhotoClick={handlePhotoClick}
        onClick={formik.handleSubmit}
        isDisabled={formik.isSubmitting}
        isImgLoading={isImgLoading}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileSelection}
        style={{ display: "none" }}
        ref={inputEl}
      />
    </FloatingPill>
  );
}
