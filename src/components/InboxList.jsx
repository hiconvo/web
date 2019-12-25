import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import { useEvents } from "../hooks";
import InboxListItem from "./InboxListItem";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 2 * ${themeGet("sidebarChromeHeight")});
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
  const { id } = useParams();
  const [events] = useEvents();

  return (
    <Container>
      {events.map(resource => (
        <motion.div key={resource.id} layoutTransition={spring}>
          <InboxListItem
            key={resource.id}
            resource={resource}
            isSelected={resource.id === id}
          />
        </motion.div>
      ))}
    </Container>
  );
}
