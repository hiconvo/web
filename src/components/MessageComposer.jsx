import React, { useState, useRef } from "react";
import imageFileToBase64 from "image-file-to-base64-exif";

import useFormik from "../hooks/formik";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";
import * as unboundNotifActions from "../actions/notifications";
import Controls from "./MessageComposerControls";
import MessageImagePreview from "./MessageImagePreview";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import { Box } from "./styles";

const validate = values => {
  return getTextFromEditorState(values.body).length <= 0
    ? { message: "Your message cannot be empty" }
    : null;
};

export default function MessageComposer({
  createMessage,
  height = "4rem",
  backgroundColor = "white",
  placeholder = "Compose your response..."
}) {
  const inputEl = useRef(null);
  const [src, setSrc] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [{ id }] = useSelectors(getSelectedResource);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const formik = useFormik({
    formId: id,
    initialValues: { body: getInitialEditorState() },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      try {
        setSubmitting(true);
        await createMessage(id, {
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
    <Box>
      <Composer
        height={height}
        backgroundColor={backgroundColor}
        placeholder={placeholder}
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
    </Box>
  );
}
