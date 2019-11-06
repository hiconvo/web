import React, { useState, useRef } from "react";
import { Editor, EditorState, ContentState } from "draft-js";

import Controls from "./MessageComposerControls";
import { theme } from "./styles";

const grayBackgroundStyle = height => ({
  width: `calc(100% - ${theme.space[3]} * 2)`,
  marginBottom: "1rem",
  backgroundColor: theme.colors.snow,
  border: `0.1rem solid ${theme.colors.veryLightGray}`,
  borderRadius: theme.radii.normal,
  padding: theme.space[3],
  minHeight: height,
  marginTop: theme.space[3]
});

const whiteBackgroundStyle = height => ({
  width: "100%",
  minHeight: height,
  marginBottom: "1rem"
});

export default function Composer({
  backgroundColor = "white",
  height = "4rem",
  onClick,
  isDisabled,
  placeholder,
  initialValue = ""
}) {
  const editorRef = useRef(null);
  const [currentValue, setValue] = useState(
    EditorState.createWithContent(ContentState.createFromText(initialValue))
  );

  function handleClick(e) {
    e.preventDefault();
    onClick(
      currentValue
        .getCurrentContent()
        .getPlainText()
        .trim(),
      () => setValue(EditorState.createEmpty())
    );
  }

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
          onChange={setValue}
          editorState={currentValue}
          placeholder={placeholder}
          ref={editorRef}
        />
      </div>
      <Controls
        value={currentValue}
        onClick={handleClick}
        isDisabled={isDisabled}
      />
    </React.Fragment>
  );
}
