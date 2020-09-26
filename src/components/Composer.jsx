import React, { useRef, useEffect } from "react";
import Editor from "draft-js-plugins-editor";
import createMarkdownPlugin from "draft-js-markdown-plugin";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { markdownToDraft, draftToMarkdown } from "markdown-draft-js";

import { theme, Box } from "./styles";
import { MarkdownContainer } from "./Markdown";

const grayBackgroundStyle = (height) => ({
  width: `calc(100% - ${theme.space[3]} * 2)`,
  backgroundColor: theme.colors.snow,
  border: `0.1rem solid ${theme.colors.veryLightGray}`,
  borderRadius: theme.radii.normal,
  padding: theme.space[3],
  minHeight: height,
  marginTop: theme.space[3]
});

const whiteBackgroundStyle = (height) => ({
  width: "100%",
  minHeight: height,
  marginBottom: "1rem"
});

export function getInitialEditorState(text) {
  if (!text) {
    return EditorState.createEmpty();
  }

  return EditorState.createWithContent(convertFromRaw(markdownToDraft(text)));
}

export function getTextFromEditorState(editorState) {
  const content = editorState.getCurrentContent();
  return draftToMarkdown(convertToRaw(content));
}

const basic = createMarkdownPlugin({
  renderLanguageSelect: () => <Box mt="-1.2rem" />,
  features: {
    inline: ["BOLD", "ITALIC", "CODE", "LINK"],
    block: ["blockquote", "unordered-list-item"]
  }
});

const complete = createMarkdownPlugin({
  renderLanguageSelect: () => <Box mt="-1.2rem" />,
  inline: ["BOLD", "ITALIC", "CODE", "LINK"],
  block: [
    "header-one",
    "header-two",
    "header-three",
    "ordered-list-item",
    "unordered-list-item",
    "blockquote"
  ]
});

export default function Composer({
  backgroundColor = "white",
  height = "4rem",
  fontSize = 3,
  mode = "basic",
  autoFocus = false,
  editorState = EditorState.createEmpty(),
  onChange,
  placeholder
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      editorRef.current && editorRef.current.focus();
    }
  }, [autoFocus]);

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
        <MarkdownContainer fontFamily="serif" fontSize={fontSize}>
          <Editor
            onChange={onChange}
            editorState={editorState}
            placeholder={placeholder}
            ref={editorRef}
            plugins={[mode === "basic" ? basic : complete]}
          />
        </MarkdownContainer>
      </div>
    </React.Fragment>
  );
}
