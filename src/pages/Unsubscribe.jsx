import React, { useState } from "react";

import { errorToString } from "../utils";
import { useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { Ripple, CenterContent, Box, Text } from "../components/styles";

let isInFlight = false;

export default function Magic({ match }) {
  const [message, setMessage] = useState("");
  const { key, timestamp, signature } = match.params;
  const { magicUnsubscribe } = useActions(unboundActions);

  async function handleUnsubscribe() {
    if (isInFlight) return;

    isInFlight = true;

    try {
      await magicUnsubscribe({ userId: key, timestamp, signature });
    } catch (e) {
      setMessage(errorToString(e));
      return;
    }

    setMessage(
      "You have been unsubscribed from all emails, including event invitations. Login to change your settings."
    );
  }

  handleUnsubscribe();

  return (
    <CenterContent>
      <Box maxWidth="70rem" p={3}>
        {message ? (
          <Text fontSize={3} textAlign="center">
            {message}
          </Text>
        ) : (
          <Ripple />
        )}
      </Box>
    </CenterContent>
  );
}
