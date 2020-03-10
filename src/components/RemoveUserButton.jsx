import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundThreadActions from "../actions/threads";
import * as unboundEventActions from "../actions/events";
import ConfirmationModal from "./ConfirmationModal";
import { Paragraph } from "./styles";

export default function RemoveUserButton({ render, user, event, thread }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { removeUserFromThread } = useActions(unboundThreadActions);
  const { removeUserFromEvent } = useActions(unboundEventActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleRemoveMember() {
    setIsLoading(true);

    try {
      if (event) {
        await removeUserFromEvent({ user, event });
      } else {
        await removeUserFromThread({ user, thread });
      }
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
        onConfirm={handleRemoveMember}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="gray">
          {event
            ? `This will disinvite ${user.fullName} from this event. You can readd ${user.firstName} to this event again if you change your mind. In many cultures around the world, it is considered rude to uninvite someone from an event.`
            : `This will remove ${user.fullName} from this convo. ${user.firstName} will not be able to send or receive messages in this convo again, nor will ${user.firstName} be able to see this convo on this website. ${user.firstName} may still have copies of this convo among their emails, however. You can readd ${user.firstName} to this convo again if you change your mind.`}
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
