import React, { useState } from "react";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";

import { FloatingPill } from "./styles";
import Controls from "./ComposerControls";
import { useActions, useSelectors } from "../redux";
import { getSelectedThread } from "../selectors";
import * as unboundActions from "../actions/messages";

const nullValue = Plain.deserialize("");

export default function Composer() {
  const [currentValue, setValue] = useState(nullValue);
  const [{ id: threadId }] = useSelectors(getSelectedThread);
  const [isDisabled, setIsDisabled] = useState(false);
  const { createMessage } = useActions(unboundActions);

  function handleChange({ value }) {
    setValue(value);
  }

  async function handleSend() {
    setIsDisabled(true);

    try {
      await createMessage(threadId, { body: Plain.serialize(currentValue) });
    } catch (e) {
      setIsDisabled(false);
    }

    setIsDisabled(false);
    setValue(nullValue);
  }

  return (
    <FloatingPill>
      <Editor
        onChange={handleChange}
        value={currentValue}
        placeholder="Compose your response..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Controls
        value={currentValue}
        onClick={handleSend}
        isDisabled={isDisabled}
      />
    </FloatingPill>
  );
}
