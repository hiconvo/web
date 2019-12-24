import React from "react";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import UserOverflowList from "./UserOverflowList";
import { Paragraph } from "./styles";

export default function ContactsSidebar({ transformUserProps = p => p }) {
  const [contacts] = useSelectors(getContacts);

  return (
    <div>
      <Paragraph color="gray" mb={2} fontSize={0}>
        Your contacts
      </Paragraph>
      <UserOverflowList
        maxLength={7}
        users={contacts}
        transformUserProps={transformUserProps}
        renderExtraChildren={() =>
          contacts.length <= 0 && (
            <Paragraph fontSize={1} mt={2} color="gray">
              You haven't added any contacts yet.
            </Paragraph>
          )
        }
      />
    </div>
  );
}
