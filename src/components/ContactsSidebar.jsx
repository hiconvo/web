import React from "react";

import { Box, Text, Button } from "../components/styles";
import { useActions } from "../redux";
import * as unboundActions from "../actions/contacts";

export default function ContactsSidebar({ selectedContact }) {
  const { addToContacts, removeFromContacts } = useActions(unboundActions);

  return (
    <Box>
      <Text>{selectedContact.fullName}</Text>
      <Button onClick={() => addToContacts(selectedContact.id)}>
        Add to contacts
      </Button>
      <Button onClick={() => removeFromContacts(selectedContact.id)}>
        Remove from contacts
      </Button>
    </Box>
  );
}
