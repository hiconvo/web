import React from "react";

import { useSelectors } from "../redux";
import { getSelectedResource, getUser } from "../selectors";
import EventInfoBox from "./EventInfoBox";
import ThreadInfoBox from "./ThreadInfoBox";
import { Box } from "./styles";

export default function ResourceInfoBox({ position = "fixed" }) {
  const [resource, user] = useSelectors(getSelectedResource, getUser);
  const isEvent = resource.resourceType === "Event";

  return (
    <Box>
      <Box position={position} width="28rem">
        {isEvent ? (
          <EventInfoBox event={resource} user={user} />
        ) : (
          <ThreadInfoBox thread={resource} user={user} />
        )}
      </Box>
    </Box>
  );
}
