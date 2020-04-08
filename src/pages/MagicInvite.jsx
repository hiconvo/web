import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";

import { useActions, useSelectors } from "../redux";
import { getIsEventsFetched } from "../selectors";
import * as unboundActions from "../actions/events";
import { Ripple, CenterContent } from "../components/styles";

let isInFlight = false;

export default function MagicInvite() {
  const { key, timestamp, signature } = useParams();
  const history = useHistory();
  const { magicInvite } = useActions(unboundActions);
  const [isEventsFetched] = useSelectors(getIsEventsFetched);

  useEffect(() => {
    async function handleMagicInvite() {
      if (isInFlight) return;

      isInFlight = true;

      await magicInvite({ eventId: key, timestamp, signature });

      history.push(`/events/${key}`);
    }

    if (isEventsFetched) {
      handleMagicInvite();
    }
  }, [isEventsFetched, history, magicInvite, key, timestamp, signature]);

  return (
    <CenterContent>
      <Ripple />
    </CenterContent>
  );
}
