import React, { useState } from "react";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";

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

const nullValue = Plain.deserialize("");

export default function Composer({
  backgroundColor = "white",
  height = "4rem",
  onClick,
  isDisabled,
  placeholder
}) {
  const [currentValue, setValue] = useState(nullValue);

  function handleClick(e) {
    e.preventDefault();
    onClick(Plain.serialize(currentValue), () => setValue(nullValue));
  }

  return (
    <React.Fragment>
      <Editor
        onChange={({ value }) => setValue(value)}
        value={currentValue}
        placeholder={placeholder}
        style={
          backgroundColor === "white"
            ? whiteBackgroundStyle(height)
            : grayBackgroundStyle(height)
        }
      />
      <Controls
        value={currentValue}
        onClick={handleClick}
        isDisabled={isDisabled}
      />
    </React.Fragment>
  );
}
