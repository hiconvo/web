import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import { useSelectors } from "../redux";
import { getEvents, getEventsPageInfo } from "../selectors";
import { usePagination } from "../hooks";
import { fetchEvents } from "../actions/events";
import InboxListItem from "./InboxListItem";
import { Box } from "./styles";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 2 * ${themeGet("sidebarChromeHeight")} - 28rem);
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${themeGet("media.phone")} {
    height: auto;
    overflow-y: visible;
  }
`;

const spring = {
  type: "spring",
  damping: 200,
  stiffness: 600
};

export default function InboxList() {
  const containerRef = useRef();
  const { id } = useParams();
  const [events] = useSelectors(getEvents);
  usePagination(fetchEvents, getEventsPageInfo, containerRef.current);

  return (
    <Container ref={containerRef}>
      {events.map((resource) => (
        <motion.div key={resource.id} layoutTransition={spring}>
          <InboxListItem
            key={resource.id}
            resource={resource}
            isSelected={resource.id === id}
          />
        </motion.div>
      ))}
      <Box height="5rem" flexShrink="0" />
    </Container>
  );
}
