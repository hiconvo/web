import React from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/events";
import { Ripple, CenterContent } from "../components/styles";

let isInFlight = false;

export default function Rsvp({ match, history }) {
  const { eventId, key, timestamp, signature } = match.params;
  const { magicRsvp } = useActions(unboundActions);

  async function handleRsvp() {
    if (isInFlight) return;

    isInFlight = true;

    try {
      await magicRsvp({ userID: key, eventID: eventId, timestamp, signature });
    } catch (e) {
    } finally {
      history.push(`/events/${eventId}`);
    }
  }

  handleRsvp();

  return (
    <CenterContent>
      <Ripple />
    </CenterContent>
  );
}
