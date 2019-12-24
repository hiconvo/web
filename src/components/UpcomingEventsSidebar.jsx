import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { useEvents } from "../hooks";
import { getUpcomingEvents } from "../selectors";
import { Paragraph, Box, Text, Icon } from "./styles";

export default function UpcomingEventsSidebar() {
  const [events] = useEvents(getUpcomingEvents);

  return (
    <div>
      <Paragraph color="gray" mb={2} fontSize={0}>
        Upcoming events
      </Paragraph>
      {events.length <= 0 ? (
        <div>
          <Paragraph fontSize={1}>
            You don't have any upcoming events right now.
          </Paragraph>
        </div>
      ) : (
        events.map(event => (
          <Link to={`/events/${event.id}`}>
            <Box flexDirection="row" alignItems="center" py={2}>
              <Box flexShrink="0">
                <Icon name="event" mr={2} fontSize={3} />
              </Box>
              <Box flexDirection="column" overflow="hidden">
                <Text
                  weight="semiBold"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  fontSize={1}
                  mb={1}
                >
                  {event.name}
                </Text>
                <Text fontSize={0}>
                  {format(new Date(event.timestamp), "MMM d @ h:mm a")}
                </Text>
              </Box>
            </Box>
          </Link>
        ))
      )}
    </div>
  );
}
