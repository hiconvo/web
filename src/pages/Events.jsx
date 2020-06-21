import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Helmet } from "react-helmet";

import { useSelectors, useActions } from "../redux";
import { getEventById, getEvents, getIsEventsFetched } from "../selectors";
import * as unboundEventActions from "../actions/events";
import { ContainerDualTabletRightSidebars } from "./styles";
import EventSidebar from "../components/EventSidebar";
import EventViewer from "../components/EventViewer";
import EventInfoBox from "../components/EventInfoBox";
import {
  Box,
  Ripple,
  CenterContent,
  LinkButton,
  Paragraph,
  Icon,
  Text
} from "../components/styles";
import { errorToString } from "../utils";

const Container = styled.div`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
    max-width: 70rem;
    width: 100%;
    margin: 0 auto;
  }
`;

const fetched = new Set();

export default function Events() {
  const { id } = useParams();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchEvent } = useActions(unboundEventActions);
  const [isEventsFetched, events, event] = useSelectors(
    getIsEventsFetched,
    getEvents,
    getEventById(id)
  );

  useEffect(() => {
    async function handleFetchEvent() {
      if (id && !event && isEventsFetched && !fetched.has(id)) {
        try {
          await fetchEvent(id);
        } catch (e) {
          setErrorMessage(errorToString(e));
        } finally {
          fetched.add(id);
        }
      } else if (id && event) {
        id && fetched.add(id);
      }
    }

    handleFetchEvent();
  }, [isEventsFetched, id, fetchEvent, event]);

  if (!events.length || !id || !event) {
    if (!id && events.length && events[0] && events[0].id) {
      history.push(`/events/${events[0].id}`);
    }

    if (isEventsFetched && !events.length) {
      return (
        <CenterContent>
          <Box maxWidth="40rem">
            <Paragraph textAlign="center" fontSize={3} mb={4}>
              It looks like you haven't created or been invited to any events
              yet{" "}
              <span role="img" aria-label="sad face">
                😕
              </span>
            </Paragraph>

            <LinkButton
              variant="primary"
              to="/events/new"
              maxWidth="30rem"
              width="100%"
              margin="auto"
            >
              <Icon name="event" fontSize={3} mr={2} /> Create an event
            </LinkButton>
          </Box>
        </CenterContent>
      );
    }

    return (
      <CenterContent>
        <Box maxWidth="70rem" p={3}>
          {errorMessage ? (
            <Text fontSize={3} textAlign="center">
              {errorMessage}
            </Text>
          ) : (
            <Ripple />
          )}
        </Box>
      </CenterContent>
    );
  }

  return (
    <ContainerDualTabletRightSidebars>
      <Helmet>
        <title>{"Convo | " + event.name}</title>
      </Helmet>
      <EventSidebar />
      <Container>
        <EventViewer event={event} />
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <EventInfoBox event={event} />
        </Box>
      </Box>
    </ContainerDualTabletRightSidebars>
  );
}
