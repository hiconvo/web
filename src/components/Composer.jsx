import React, { useRef } from "react";
import { Editor, EditorState, ContentState } from "draft-js";

import { theme } from "./styles";

const commonStyles = {
  fontFamily: theme.fonts.serif,
  fontSize: theme.fontSizes[3],
  lineHeight: "1.5em"
};

const grayBackgroundStyle = (height) => ({
  width: `calc(100% - ${theme.space[3]} * 2)`,
  backgroundColor: theme.colors.snow,
  border: `0.1rem solid ${theme.colors.veryLightGray}`,
  borderRadius: theme.radii.normal,
  padding: theme.space[3],
  minHeight: height,
  marginTop: theme.space[3],
  ...commonStyles
});

const whiteBackgroundStyle = (height) => ({
  width: "100%",
  minHeight: height,
  marginBottom: "1rem",
  ...commonStyles
});

export function getInitialEditorState(text) {
  if (!text) {
    return EditorState.createEmpty();
  }

  return EditorState.createWithContent(ContentState.createFromText(text));
}

export function getTextFromEditorState(editorState) {
  return editorState.getCurrentContent().getPlainText().trim();
}

export default function Composer({
  backgroundColor = "white",
  height = "4rem",
  editorState = EditorState.createEmpty(),
  onChange,
  placeholder
}) {
  const editorRef = useRef(null);

  return (
    <React.Fragment>
      <div
        onClick={() => editorRef.current && editorRef.current.focus()}
        style={
          backgroundColor === "white"
            ? whiteBackgroundStyle(height)
            : grayBackgroundStyle(height)
        }
      >
        <Editor
          onChange={onChange}
          editorState={editorState}
          placeholder={placeholder}
          ref={editorRef}
        />
      </div>
    </React.Fragment>
  );
}
