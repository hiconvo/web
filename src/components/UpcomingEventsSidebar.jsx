import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { useSelectors } from "../redux";
import { getUpcomingEvents } from "../selectors";
import { Paragraph, Box, Text, Icon } from "./styles";

export default function UpcomingEventsSidebar() {
  const [events] = useSelectors(getUpcomingEvents);

  return (
    <Box mb={3}>
      <Paragraph color="gray" mb={2} fontSize={0}>
        Upcoming events
      </Paragraph>
      {events.length <= 0 ? (
        <Paragraph fontSize={1}>
          You don't have any upcoming events right now.{" "}
          <Link to="/events/new">
            <Text color="primary900" fontSize={1} fontWeight="semiBold">
              Create an event <Icon name="call_made" fontSize={1} />
            </Text>
          </Link>
        </Paragraph>
      ) : (
        events.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
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
                  fontSize={2}
                  mb={1}
                >
                  {event.name}
                </Text>
                <Text fontSize={0} color="gray">
                  {format(new Date(event.timestamp), "MMM d @ h:mm a")}
                </Text>
              </Box>
            </Box>
          </Link>
        ))
      )}
    </Box>
  );
}
