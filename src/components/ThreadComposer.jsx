import React, { useState, useRef } from "react";
import imageFileToBase64 from "image-file-to-base64-exif";

import useFormik from "../hooks/formik";
import { useActions } from "../redux";
import Controls from "./MessageComposerControls";
import MessageImagePreview from "./MessageImagePreview";
import MultiMemberPickerField from "./MultiMemberPickerField";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import { Box, Text } from "./styles";
import * as unboundActions from "../actions/threads";
import * as unboundNotifActions from "../actions/notifications";

const validate = values => {
  if (getTextFromEditorState(values.body).length <= 0) {
    return { message: "Your message cannot be empty" };
  } else {
    return null;
  }
};

export default function ThreadComposer() {
  const inputEl = useRef(null);
  const { createThread } = useActions(unboundActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const [src, setSrc] = useState("");
  const [isImgLoading, setIsImgLoading] = useState(false);
  const formik = useFormik({
    formId: "newThread",
    initialValues: {
      body: getInitialEditorState(),
      subject: "",
      members: []
    },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors, reset }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      try {
        setSubmitting(true);
        await createThread({
          subject: values.subject,
          users: values.members,
          body: getTextFromEditorState(values.body)
        });

        reset();
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
        height="8rem"
        backgroundColor="white"
        placeholder="Share a link, photo, or message with people..."
        editorState={formik.values.body}
        onChange={body => formik.setFieldValue("body", body)}
        isDisabled={formik.isSubmitting}
      />
      <Box
        flexDirection="row"
        borderTop="dashed"
        borderBottom="dashed"
        alignItems="center"
        mb={1}
      >
        <Text
          fontSize={2}
          mr={1}
          color="mediumGray"
          fontWeight="semiBold"
          flexShrink={0}
        >
          Share with:
        </Text>
        <MultiMemberPickerField
          members={formik.values.members}
          setMembers={members => formik.setFieldValue("members", members)}
        />
      </Box>
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
