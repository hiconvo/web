import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import { useSelectors } from "../redux";
import { getResourceById } from "../selectors";
import EventInfoBox from "./EventInfoBox";
import ThreadInfoBox from "./ThreadInfoBox";
import { Box } from "./styles";

export default function ResourceInfoBox({ position = "fixed" }) {
  const isEvent = useRouteMatch("/events");
  const { id } = useParams();
  const [resource] = useSelectors(getResourceById(id));

  if (!resource) return null;

  return (
    <Box>
      <Box position={position} width="28rem">
        {isEvent ? (
          <EventInfoBox event={resource} />
        ) : (
          <ThreadInfoBox thread={resource} />
        )}
      </Box>
    </Box>
  );
}
