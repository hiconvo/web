import React, { useEffect, useState, useRef } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";

import useFormik from "../hooks/formik";
import { useActions, useSelectors } from "../redux";
import { getUser, getMessagesByThreadId } from "../selectors";
import { getGoogleMapsUrl } from "../utils";
import * as unboundActions from "../actions/messages";
import * as unboundNotifActions from "../actions/notifications";
import Markdown from "./Markdown";
import Map from "./Map";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import Controls from "./MessageComposerControls";
import RsvpPanel from "./RsvpPanel";
import Message from "./Message";
import { useReadReporting } from "../hooks";
import { FloatingPill, Text, Heading, Icon, Box, Ripple } from "./styles";

const validate = values => {
  return getTextFromEditorState(values.body).length <= 0
    ? { message: "Your message cannot be empty" }
    : null;
};

export default function EventViewer({ event }) {
  const [isLoading, setIsLoading] = useState(false);
  const { createEventMessage, fetchEventMessages } = useActions(unboundActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const fetched = useRef({});
  const formik = useFormik({
    initialValues: { body: getInitialEditorState() },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      try {
        setSubmitting(true);
        createEventMessage(id, { body: getTextFromEditorState(values.body) });
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }
    }
  });

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
                rel="noopener noreferrer"
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

        <Box mt="2.4rem" mb={2} overflow="hidden">
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
          editorState={formik.values.body}
          onChange={body => formik.setFieldValue("body", body)}
          isDisabled={formik.isSubmitting}
        />
        <Controls
          editorState={formik.values.body}
          onClick={formik.handleSubmit}
          isDisabled={formik.isSubmitting}
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
