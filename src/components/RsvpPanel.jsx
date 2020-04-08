import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import { getUser } from "../selectors";
import * as unboundActions from "../actions/events";
import { Text, Icon, Box, UnstyledButton } from "./styles";

const ActionButton = styled(UnstyledButton)`
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  border-radius: ${themeGet("radii.special")};
  border: ${(props) => (props.isGoing ? "2px solid black" : "none")};
  background-color: ${(props) => (props.isGoing ? "white" : "transparent")};
  transition: all ease 0.2s;
  color: ${themeGet("colors.gray")};
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: ${themeGet("space.2")};

  &:hover {
    background-color: ${themeGet("colors.trueWhite")};
    color: ${themeGet("colors.bodytext")};
  }
`;

export default function RsvpPanel({ event }) {
  const { addRSVPToEvent, removeRSVPFromEvent } = useActions(unboundActions);
  const [user] = useSelectors(getUser);
  const isOwner = event && event.owner.id === user.id;
  const isGoing =
    isOwner || (event && event.rsvps.some((rsvp) => rsvp.id === user.id));

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
      <ActionButton isGoing={isGoing} onClick={handleAddRSVP}>
        <Icon
          name="check"
          fontSize={4}
          mr={2}
          color={isGoing ? "trueBlack" : "inherit"}
        />
        <Text
          fontSize={[1, 2, 3, 3]}
          color={isGoing ? "trueBlack" : "inherit"}
          fontWeight={isGoing ? "semiBold" : "normal"}
        >
          I'm going
        </Text>
      </ActionButton>
      <ActionButton isGoing={!isGoing} onClick={handleRemoveRSVP}>
        <Icon
          name="close"
          fontSize={4}
          mr={2}
          color={isGoing ? "inherit" : "trueBlack"}
        />
        <Text
          fontSize={[1, 2, 3, 3]}
          color={isGoing ? "inherit" : "trueBlack"}
          fontWeight={isGoing ? "semiBold" : "normal"}
        >
          I'm not going
        </Text>
      </ActionButton>
    </Box>
  );
}
