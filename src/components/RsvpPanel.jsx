import React from "react";

import { useSelectors, useActions } from "../redux";
import { getUser } from "../selectors";
import * as unboundActions from "../actions/events";
import { Text, Icon, Box, ActionButton } from "./styles";

export default function RsvpPanel({ event }) {
  const { addRSVPToEvent, removeRSVPFromEvent } = useActions(unboundActions);
  const [user] = useSelectors(getUser);
  const isOwner = event && event.owner.id === user.id;
  const isGoing =
    isOwner || (event && event.rsvps.some(rsvp => rsvp.id === user.id));

  async function handleAddRSVP() {
    try {
      await addRSVPToEvent({ event, user });
    } catch (e) {}
  }

  async function handleRemoveRSVP() {
    try {
      await removeRSVPFromEvent({ event, user });
    } catch (e) {}
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      mb={4}
      backgroundColor="veryLightGray"
      borderRadius="normal"
      px={3}
      py={2}
    >
      <Box mr={3}>
        <Text fontSize={[1, 2, 3, 3]} fontWeight="bold">
          RSVP:
        </Text>
      </Box>
      <ActionButton
        backgroundColor={isGoing ? "white" : ""}
        border={isGoing ? "lightGray" : ""}
        onClick={handleAddRSVP}
      >
        <Icon
          name="check"
          fontSize={4}
          mr={2}
          color={isGoing ? "trueBlack" : "inherit"}
        />
        <Text fontSize={[1, 2, 3, 3]} color={isGoing ? "trueBlack" : "inherit"}>
          I'm going
        </Text>
      </ActionButton>
      <ActionButton
        backgroundColor={isGoing ? "" : "white"}
        border={isGoing ? "" : "lightGray"}
        onClick={handleRemoveRSVP}
      >
        <Icon
          name="close"
          fontSize={4}
          mr={2}
          color={isGoing ? "inherit" : "trueBlack"}
        />
        <Text fontSize={[1, 2, 3, 3]} color={isGoing ? "inherit" : "trueBlack"}>
          I'm not going
        </Text>
      </ActionButton>
    </Box>
  );
}
