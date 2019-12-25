import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useEvents } from "../hooks";
import { useSelectors } from "../redux";
import { getEventById } from "../selectors";
import { ContainerDualSidebars } from "./styles";
import EventSidebar from "../components/EventSidebar";
import EventViewer from "../components/EventViewer";
import EventInfoBox from "../components/EventInfoBox";
import { Box, Ripple, CenterContent } from "../components/styles";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function Events() {
  const { id } = useParams();
  const history = useHistory();
  const [events] = useEvents();
  const [event] = useSelectors(getEventById(id));

  if (!events.length || !id) {
    if (events.length && events[0] && events[0].id) {
      history.push(`/events/${events[0].id}`);
    }

    return (
      <CenterContent>
        <Ripple />
      </CenterContent>
    );
  }

  return (
    <ContainerDualSidebars>
      <EventSidebar />
      <Container>
        <EventViewer event={event} />
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <EventInfoBox event={event} />
        </Box>
      </Box>
    </ContainerDualSidebars>
  );
}
