import React, { useState } from "react";

import { useActions } from "../redux";
import ConfirmationModal from "./ConfirmationModal";
import * as unboundActions from "../actions/threads";
import { Paragraph } from "./styles";

export default function LeaveThreadButton({ thread, user, render }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { removeUserFromThread } = useActions(unboundActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleRemoveUserFromThread() {
    setIsLoading(true);

    try {
      await removeUserFromThread({ thread, user, removeThread: true });
    } catch (e) {
      setIsLoading(false);
      return;
    }
  }

  return (
    <React.Fragment>
      {render(toggleIsOpen)}
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleRemoveUserFromThread}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="darkGray">
          If you leave, you will not be able to send or receive messages in "
          {thread.subject}" again, nor will you be able to view this convo on
          this website. Whatever copies of this convo you have among your emails
          will remain in tact, however. The owner of "{thread.subject}" could
          add you again.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
