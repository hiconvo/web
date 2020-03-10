import React from "react";

import RemoveUserButton from "./RemoveUserButton";
import MemberItemMedium from "./MemberItemMedium";

export default function InfoBoxMemberItem({
  member,
  thread,
  event,
  canDelete,
  ...rest
}) {
  return (
    <RemoveUserButton
      render={toggleIsOpen => (
        <MemberItemMedium
          member={member}
          onDelete={canDelete && toggleIsOpen}
          {...rest}
        />
      )}
      user={member}
      thread={thread}
      event={event}
    />
  );
}
