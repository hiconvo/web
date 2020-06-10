import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useActions } from "../redux";
import ConfirmationModal from "./ConfirmationModal";
import * as unboundActions from "../actions/events";
import { Paragraph } from "./styles";

export default function DeleteEventButton({ event, user, render }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { removeUserFromEvent } = useActions(unboundActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleLeaveEvent() {
    setIsLoading(true);

    try {
      await removeUserFromEvent({ event, user, removeEvent: true });
    } catch (e) {
      setIsLoading(false);
      return;
    }

    history.push("/convos");

    setIsOpen(false);
  }

  return (
    <React.Fragment>
      {render(toggleIsOpen)}
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleLeaveEvent}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="darkGray">
          This will remove you from "{event.name}." This action cannot be
          undone; however, the owner of the event could add you again.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
