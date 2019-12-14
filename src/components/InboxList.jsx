import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import { useSelectors, useActions } from "../redux";
import {
  getEvents,
  getIsEventsFetched,
  getSelectedResource
} from "../selectors";
import * as unboundEventActions from "../actions/events";
import * as unboundGeneralActions from "../actions/general";
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
  const [contents, isEventsFetched, { id }] = useSelectors(
    getEvents,
    getIsEventsFetched,
    getSelectedResource
  );
  const { fetchEvents } = useActions(unboundEventActions);
  const { setSelectedResource } = useActions(unboundGeneralActions);

  useEffect(() => {
    !isEventsFetched && fetchEvents();
  }, [isEventsFetched, fetchEvents]);

  useEffect(() => {
    if (isEventsFetched && !id && contents.length > 0) {
      setSelectedResource(contents[0].id);
    }
  }, [setSelectedResource, isEventsFetched, id, contents]);

  return (
    <Container>
      {isEventsFetched &&
        contents.map(resource => (
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
