import React, { useState } from "react";

import { useActions } from "../redux";
import ConfirmationModal from "./ConfirmationModal";
import * as unboundActions from "../actions/events";
import { Paragraph } from "./styles";

export default function DeleteEventButton({ event, render }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteEvent } = useActions(unboundActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleDeleteEvent() {
    setIsLoading(true);

    try {
      await deleteEvent({ event });
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
        onConfirm={handleDeleteEvent}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="darkGray">
          This will delete "{event.name}." Your guests will receive a
          cancellation email if this event is in the future. If it is in the
          past, they won't receive any email. This action cannot be undone.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
