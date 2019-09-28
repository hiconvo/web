import React from "react";
import { format, parseISO } from "date-fns";

import Markdown from "./Markdown";
import Map from "./Map";
import Composer from "./Composer";
import RsvpPanel from "./RsvpPanel";
import { FloatingPill, Text, Heading, Icon, Box } from "./styles";

export default function EventViewer({ event }) {
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

      <RsvpPanel event={event} />

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
