import React, { useState } from "react";

import { useActions } from "../redux";
import ConfirmationModal from "./ConfirmationModal";
import * as unboundActions from "../actions/messages";
import { Paragraph, UnstyledButton } from "./styles";

export default function DeleteMessageButton({ threadId, eventId, messageId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteThreadMessage, deleteEventMessage } = useActions(
    unboundActions
  );

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleDeleteMessage() {
    setIsLoading(true);

    try {
      if (threadId) {
        await deleteThreadMessage(threadId, messageId);
      } else {
        await deleteEventMessage(eventId, messageId);
      }
    } catch (e) {
      setIsLoading(false);
      return;
    }

    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <UnstyledButton p={0} onClick={toggleIsOpen}>
        Delete
      </UnstyledButton>
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleDeleteMessage}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="darkGray">
          This will delete this message. Members may still have copies of this
          message among their emails. This action cannot be undone.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
