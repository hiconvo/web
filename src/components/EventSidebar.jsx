import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getEventsCount } from "../selectors";
import InboxList from "./InboxList";
import EventCalendar from "./EventCalendar";
import { LinkButton, Icon, Box } from "./styles";

const Container = styled.div``;

const Fixed = styled.div`
  position: fixed;
  background-color: ${themeGet("colors.trueWhite")};
  top: auto;
  left: auto;
  width: calc(${themeGet("sidebarWidth")} - 0.1rem);
  height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("space.3")}) -
      ${themeGet("space.5")}
  );
  max-height: 70rem;
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
  overflow: hidden;

  @media (min-width: ${themeGet("pageMaxWidthPx")}) {
    left: calc(
      ((100vw - ${themeGet("pageMaxWidth")}) / 2) + ${themeGet("space.5")}
    );
  }
`;

const TopContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-bottom: 0.1rem solid ${themeGet("colors.veryLightGray")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BottomContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-top: 0.1rem solid ${themeGet("colors.veryLightGray")};
  display: flex;
  position: absolute;
  background-color: white;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: ${themeGet("colors.mediumGray")};
  font-size: ${themeGet("fontSizes.0")};
`;

function Top() {
  return (
    <TopContainer>
      <LinkButton
        to="/events/new"
        variant="brand"
        display="flex"
        mb="0"
        fontSize={[2]}
      >
        <Icon name="add" mr={1} fontSize="2.2rem" /> Create event
      </LinkButton>
    </TopContainer>
  );
}

function Bottom() {
  const [eventsCount] = useSelectors(getEventsCount);
  const eventsDescriptor = eventsCount === 1 ? "Event" : "Events";
  return (
    <BottomContainer>
      <Box fontSize={0} color="mediumGray" textAlign="center">
        {eventsCount} {eventsDescriptor}
      </Box>
    </BottomContainer>
  );
}

export default function EventsSidebar() {
  return (
    <Container>
      <Fixed>
        <Box position="relative" height="100%" width="100%">
          <Top />
          <EventCalendar />
          <InboxList />
          <Bottom />
        </Box>
      </Fixed>
    </Container>
  );
}
