import React, { useState } from "react";

import { FloatingPill } from "./styles";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";
import * as unboundActions from "../actions/messages";
import Composer from "./Composer";

export default function MessageComposer() {
  const [{ id: threadId }] = useSelectors(getSelectedResource);
  const [isDisabled, setIsDisabled] = useState(false);
  const { createThreadMessage } = useActions(unboundActions);

  async function handleSend(body, clearBody) {
    setIsDisabled(true);

    try {
      await createThreadMessage(threadId, { body });
    } catch (e) {
      setIsDisabled(false);
      return;
    }

    setIsDisabled(false);
    clearBody();
  }

  return (
    <FloatingPill>
      <Composer
        backgroundColor="white"
        placeholder="Compose your response..."
        onClick={handleSend}
        isDisabled={isDisabled}
      />
    </FloatingPill>
  );
}
