import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import imageFileToBase64 from "image-file-to-base64-exif";

import { getUser } from "../api/user";
import useFormik from "../hooks/formik";
import { useActions } from "../redux";
import Controls from "./MessageComposerControls";
import MessageImagePreview from "./MessageImagePreview";
import SharePicker from "./SharePicker";
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
  const history = useHistory();
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

      let thread;
      try {
        setSubmitting(true);
        thread = await createThread({
          subject: values.subject,
          users: values.members,
          body: getTextFromEditorState(values.body),
          blob: src.length ? src.split(",").pop() : ""
        });

        reset();
        setSrc("");
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }

      history.push(`/convos/${thread.id}`);
    }
  });

  useEffect(() => {
    if (history.location && history.location.search) {
      const [, id] = history.location.search.match(/\?userId=(.+)/);
      getUser(id).then(user => formik.setFieldValue("members", [user]));
    }
    // eslint-disable-next-line
  }, [history.location]);

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
        justifyContent="space-between"
        py={2}
      >
        <Text
          fontSize={2}
          mr={1}
          mb={0}
          color="mediumGray"
          fontWeight="semiBold"
          flexShrink={0}
        >
          Share with:
        </Text>
        <SharePicker
          members={formik.values.members}
          setMembers={members => formik.setFieldValue("members", members)}
        />
      </Box>
      <MessageImagePreview src={src} onClick={handleClearImage} noBorder />
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
