import React, { useEffect, useState, useRef } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

import { useActions, useSelectors } from "../redux";
import { getUser, getMessagesByThreadId } from "../selectors";
import { getGoogleMapsUrl } from "../utils";
import * as unboundActions from "../actions/messages";
import Markdown from "./Markdown";
import Map from "./Map";
import MessageComposer from "./MessageComposer";
import RsvpPanel from "./RsvpPanel";
import Message from "./Message";
import { videoChatPlaces } from "./PlacePicker";
import { useReadReporting } from "../hooks";
import { FloatingPill, Text, Heading, Icon, Box, Ripple } from "./styles";

export default function EventViewer({ event }) {
  const [isLoading, setIsLoading] = useState(false);
  const { createEventMessage, fetchEventMessages } = useActions(unboundActions);
  const fetched = useRef({});
  const { id, timestamp } = event;
  const date = parseISO(timestamp);

  const [user, messages] = useSelectors(getUser, getMessagesByThreadId(id));
  const hasMessages = messages.length > 0;
  const isVideoPlace = videoChatPlaces
    .map((p) => p.placeId)
    .includes(event.placeId);

  useEffect(() => {
    async function handleFetchMessages() {
      setIsLoading(true);
      try {
        await fetchEventMessages(id);
      } catch (e) {}
      setIsLoading(false);
    }

    if (id && !isLoading && !hasMessages && !fetched.current[id]) {
      fetched.current[id] = true;
      handleFetchMessages();
    }
  }, [id, fetchEventMessages, isLoading, hasMessages, fetched]);

  function getGoingCopy() {
    let count;
    try {
      count =
        event.users.filter((u) => event.rsvps.some((r) => r.id === u.id))
          .length + 1;
    } catch (e) {
      return "";
    }

    const verb = count === 1 ? "has" : "have";

    return `· ${count} ${verb} RSVP'd`;
  }

  useReadReporting(event);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box>
        <FloatingPill>
          <Heading mb={3} fontSize={4} fontWeight="semiBold">
            {event.name}
          </Heading>

          <Box mb={3}>
            <Box flexDirection="row" alignItems="center" mb={2}>
              <Icon name="schedule" fontSize={3} mr={2} />
              <Box display="block">
                <Text>{format(date, "EEEE, MMMM do @ h:mm a")}</Text>
                <Text color="gray" fontSize={1} ml={2} whiteSpace="nowrap">
                  {formatDistanceToNow(date, { addSuffix: true })}
                </Text>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center" mb={2}>
              <Icon name="public" fontSize={3} mr={2} />
              <Box display="block">
                <a
                  href={getGoogleMapsUrl(event.lat, event.lng, event.placeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>{event.address}</Text>
                  {!isVideoPlace && (
                    <Text color="gray" fontSize={1} ml={2} whiteSpace="nowrap">
                      Get directions <Icon name="call_made" fontSize={1} />
                    </Text>
                  )}
                </a>
              </Box>
            </Box>
            <Box flexDirection="row" alignItems="center" mb={2}>
              <Icon name="group" fontSize={3} mr={2} />
              <Text>
                {event.users.length} people were invited {getGoingCopy()}
              </Text>
            </Box>
          </Box>

          <RsvpPanel event={event} />

          {!isVideoPlace && (
            <Box mb={4}>
              <Map placeId={event.placeId} lat={event.lat} lng={event.lng} />
            </Box>
          )}

          <Box mb={3} overflow="hidden">
            <Markdown
              text={
                event.description || "This event did not include a description."
              }
            />
          </Box>

          <MessageComposer
            key={id}
            height="6rem"
            backgroundColor="gray"
            placeholder="Send a message to the guests..."
            createMessage={createEventMessage}
          />
        </FloatingPill>

        {isLoading && <Ripple />}
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            eventId={event.id}
            isAuthor={user.id === message.user.id}
          />
        ))}
      </Box>
    </motion.div>
  );
}
