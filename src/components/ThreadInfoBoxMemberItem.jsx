import React, { useState } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/threads";
import MemberItemMedium from "./MemberItemMedium";
import ConfirmationModal from "./ConfirmationModal";
import { Paragraph } from "./styles";

export default function ThreadInfoBoxMemberItem({ member, thread, canDelete, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { removeUserFromThread } = useActions(unboundActions);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  async function handleRemoveMember() {
    setIsLoading(true);

    try {
      await removeUserFromThread({ user: member, thread });
    } catch (e) {
      setIsLoading(false);
      return;
    }

    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <MemberItemMedium member={member} onDelete={canDelete && toggleIsOpen} {...rest} />
      <ConfirmationModal
        isOpen={isOpen}
        isLoading={isLoading}
        onConfirm={handleRemoveMember}
        onCancel={toggleIsOpen}
      >
        <Paragraph color="gray">
          This will remove {member.fullName} from this convo. {member.firstName}{" "}
          will not be able to send or receive messages in this convo again, nor
          will {member.firstName} be able to see this convo on this website.{" "}
          {member.firstName} may still have copies of this convo among their
          emails, however. You can readd {member.firstName} to this convo again
          if you change your mind.
        </Paragraph>
      </ConfirmationModal>
    </React.Fragment>
  );
}
