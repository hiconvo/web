import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import {
  getInboxContents,
  getIsThreadsFetched,
  getIsEventsFetched,
  getSelectedResource
} from "../selectors";
import * as unboundThreadActions from "../actions/threads";
import * as unboundEventActions from "../actions/events";
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
`;

export default function InboxList() {
  const [contents, isThreadsFetched, isEventsFetched, { id }] = useSelectors(
    getInboxContents,
    getIsThreadsFetched,
    getIsEventsFetched,
    getSelectedResource
  );
  const { fetchThreads } = useActions(unboundThreadActions);
  const { fetchEvents } = useActions(unboundEventActions);

  useEffect(() => {
    !isThreadsFetched && fetchThreads();
  }, [isThreadsFetched, fetchThreads]);

  useEffect(() => {
    !isEventsFetched && fetchEvents();
  }, [isEventsFetched, fetchEvents]);

  return (
    <Container>
      {contents.map(resource => (
        <InboxListItem
          key={resource.id}
          resource={resource}
          isSelected={resource.id === id}
        />
      ))}
    </Container>
  );
}
