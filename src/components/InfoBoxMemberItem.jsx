import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundThreadActions from "../actions/threads";
import * as unboundEventActions from "../actions/events";
import MemberItemMedium from "./MemberItemMedium";
import ConfirmationModal from "./ConfirmationModal";
import { Paragraph } from "./styles";

export default function InfoBoxMemberItem({
  member,
  thread,
  event,
  canDelete,
  ...rest
}) {
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
        await removeUserFromEvent({ user: member, event });
      } else {
        await removeUserFromThread({ user: member, thread });
      }
    } catch (e) {
      setIsLoading(false);
      return;
    }

    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <MemberItemMedium
        member={member}
        onDelete={canDelete && toggleIsOpen}
        {...rest}
      />
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleRemoveMember}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="gray">
          {event
            ? `This will uninvite ${member.fullName} from this event. You can readd ${member.firstName} to this event again if you change your mind. In many cultures around the world, it is considered rude to uninvite someone from an event.`
            : `This will remove ${member.fullName} from this convo. ${member.firstName} will not be able to send or receive messages in this convo again, nor will ${member.firstName} be able to see this convo on this website. ${member.firstName} may still have copies of this convo among their emails, however. You can readd ${member.firstName} to this convo again if you change your mind.`}
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
