import React, { useState } from "react";

import { useActions } from "../redux";
import ConfirmationModal from "./ConfirmationModal";
import * as unboundActions from "../actions/threads";
import { Paragraph } from "./styles";

export default function DeleteThreadButton({ thread, render }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteThread } = useActions(unboundActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleDeleteThread() {
    setIsLoading(true);

    try {
      await deleteThread({ thread });
    } catch (e) {
      setIsLoading(false);
      return;
    }

    setIsOpen(false);
  }

  return (
    <React.Fragment>
      {render(toggleIsOpen)}
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleDeleteThread}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="gray">
          This will delete "{thread.subject}" and all of its messages. None of
          this convo's members will be able send messages to this convo again,
          nor will they be able to view this convo on this website. However,
          members may still have copies of this convo among their emails. This
          action cannot be undone.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
