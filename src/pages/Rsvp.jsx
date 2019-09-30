import React, { useState } from "react";

import { errorToString } from "../utils";
import { useActions } from "../redux";
import * as unboundActions from "../actions/events";
import { Ripple, CenterContent, Text } from "../components/styles";

export default function Rsvp({ match, history }) {
  const [error, setError] = useState("");
  const [isInFlight, setIsInFlight] = useState(false);
  const { eventId, key, timestamp, signature } = match.params;
  const { magicRsvp } = useActions(unboundActions);

  async function handleRsvp() {
    if (isInFlight) return;

    try {
      setIsInFlight(true);
      await magicRsvp({ userID: key, eventID: eventId, timestamp, signature });
      history.push("/convos");
    } catch (e) {
      setError(errorToString(e));
    }

    setIsInFlight(false);
  }

  handleRsvp();

  return (
    <CenterContent>
      {error ? <Text fontSize={3}>{error}</Text> : <Ripple />}
    </CenterContent>
  );
}
