import React, { useRef } from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/events";
import { Ripple, CenterContent } from "../components/styles";

export default function Rsvp({ match, history }) {
  const isInFlight = useRef(false);
  const { eventId, key, timestamp, signature } = match.params;
  const { magicRsvp } = useActions(unboundActions);

  async function handleRsvp() {
    if (isInFlight.current) return;

    try {
      isInFlight.current = true;
      await magicRsvp({ userID: key, eventID: eventId, timestamp, signature });
    } catch (e) {
    } finally {
      history.push("/convos");
    }
  }

  handleRsvp();

  return (
    <CenterContent>
      <Ripple />
    </CenterContent>
  );
}
