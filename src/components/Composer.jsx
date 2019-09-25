import React, { useState } from "react";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";

import Controls from "./MessageComposerControls";
import { theme } from "./styles";

const grayBackgroundStyle = {
  width: `calc(100% - ${theme.space[3]} * 2)`,
  marginBottom: "1rem",
  backgroundColor: theme.colors.snow,
  border: `0.1rem solid ${theme.colors.veryLightGray}`,
  borderRadius: theme.radii.normal,
  padding: theme.space[3],
  minHeight: "16rem",
  marginTop: theme.space[3]
};

const whiteBackgroundStyle = { width: "100%", marginBottom: "1rem" };

const nullValue = Plain.deserialize("");

export default function Composer({
  backgroundColor = "white",
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
            ? whiteBackgroundStyle
            : grayBackgroundStyle
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
