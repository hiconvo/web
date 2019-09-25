import React from "react";
import { format, parseISO } from "date-fns";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import Markdown from "./Markdown";
import Map from "./Map";
import Composer from "./Composer";
import { FloatingPill, Text, Heading, Icon, Box, ActionButton } from "./styles";

export default function EventViewer({ event }) {
  const [user] = useSelectors(getUser);
  const isGoing = event && event.rsvps.some(rsvp => rsvp.id === user.id);

  return (
    <FloatingPill>
      <Heading mb={3} fontSize={4} fontWeight="semiBold">
        {event.name}
      </Heading>

      <Box mb={3}>
        <Box flexDirection="row" alignItems="center" mb={2}>
          <Icon name="public" fontSize={3} mr={2} />
          <Text>{event.address}</Text>
        </Box>
        <Box flexDirection="row" alignItems="center" mb={2}>
          <Icon name="schedule" fontSize={3} mr={2} />
          <Text>{format(parseISO(event.time), "MMMM do @ h:mm a")}</Text>
        </Box>
        <Box flexDirection="row" alignItems="center" mb={2}>
          <Icon name="group" fontSize={3} mr={2} />
          <Text>{event.users.length} people were invited</Text>
        </Box>
      </Box>

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
          <Text fontWeight="bold">RSVP:</Text>
        </Box>
        <ActionButton backgroundColor={isGoing ? "white" : ""}>
          <Icon
            name="check"
            fontSize={4}
            mr={2}
            color={isGoing ? "trueBlack" : "inherit"}
          />
          <Text fontSize={3} color={isGoing ? "trueBlack" : "inherit"}>
            I'm going
          </Text>
        </ActionButton>
        <ActionButton backgroundColor={isGoing ? "" : "white"}>
          <Icon
            name="close"
            fontSize={4}
            mr={2}
            color={isGoing ? "inherit" : "trueBlack"}
          />
          <Text fontSize={3} color={isGoing ? "inherit" : "trueBlack"}>
            I'm not going
          </Text>
        </ActionButton>
      </Box>

      <Map placeId={event.placeID} />

      <Box mt="2.4rem" mb={2}>
        <Markdown
          text={
            event.description || "This event did not include a description."
          }
        />
      </Box>

      <Composer
        height="6rem"
        backgroundColor="gray"
        placeholder="Send a message to the guests..."
      />
    </FloatingPill>
  );
}
