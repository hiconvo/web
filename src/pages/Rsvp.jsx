import React, { useState, useRef } from "react";

import { errorToString } from "../utils";
import { useActions } from "../redux";
import * as unboundActions from "../actions/events";
import { Ripple, CenterContent, Text } from "../components/styles";

export default function Rsvp({ match, history }) {
  const isInFlight = useRef(false);
  const [error, setError] = useState("");
  const { eventId, key, timestamp, signature } = match.params;
  const { magicRsvp } = useActions(unboundActions);

  async function handleRsvp() {
    if (isInFlight.current) return;

    try {
      isInFlight.current = true;
      await magicRsvp({ userID: key, eventID: eventId, timestamp, signature });
      history.push("/convos");
    } catch (e) {
      setError(errorToString(e));
    }
  }

  handleRsvp();

  return (
    <CenterContent>
      {error ? <Text fontSize={3}>{error}</Text> : <Ripple />}
    </CenterContent>
  );
}
