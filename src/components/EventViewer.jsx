import React, { useEffect, useState, useRef } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";

import { useActions, useSelectors } from "../redux";
import { getUser, getMessagesByThreadId } from "../selectors";
import { getGoogleMapsUrl } from "../utils";
import * as unboundActions from "../actions/messages";
import Markdown from "./Markdown";
import Map from "./Map";
import Composer from "./Composer";
import RsvpPanel from "./RsvpPanel";
import Message from "./Message";
import { useReadReporting } from "../hooks";
import { FloatingPill, Text, Heading, Icon, Box, Ripple } from "./styles";

export default function EventViewer({ event }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createEventMessage, fetchEventMessages } = useActions(unboundActions);
  const fetched = useRef({});

  const { id, timestamp } = event;
  const date = parseISO(timestamp);

  const [user, messages] = useSelectors(getUser, getMessagesByThreadId(id));
  const hasMessages = messages.length > 0;

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

  async function handleSend(body, clearBody) {
    setIsDisabled(true);

    try {
      await createEventMessage(id, { body });
    } catch (e) {
      setIsDisabled(false);
      return;
    }

    setIsDisabled(false);
    clearBody();
  }

  useReadReporting(event);

  return (
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
                href={getGoogleMapsUrl(event.lat, event.lng, event.placeID)}
                target="_blank"
              >
                <Text>{event.address}</Text>
                <Text color="gray" fontSize={1} ml={2} whiteSpace="nowrap">
                  Get directions <Icon name="call_made" fontSize={1} />
                </Text>
              </a>
            </Box>
          </Box>
          <Box flexDirection="row" alignItems="center" mb={2}>
            <Icon name="group" fontSize={3} mr={2} />
            <Text>{event.users.length} people were invited</Text>
          </Box>
        </Box>

        <RsvpPanel event={event} />

        <Map placeId={event.placeID} lat={event.lat} lng={event.lng} />

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
          onClick={handleSend}
          isDisabled={isDisabled}
        />
      </FloatingPill>
      {isLoading && <Ripple />}
      {messages.map(message => (
        <Message
          key={message.id}
          message={message}
          isAuthor={user.id === message.user.id}
        />
      ))}
    </Box>
  );
}
