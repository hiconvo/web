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

export default function InboxList() {
  const [contents, isThreadsFetched, isEventsFetched, { id }] = useSelectors(
    getInboxContents,
    getIsThreadsFetched,
    getIsEventsFetched,
    getSelectedResource
  );
  const { fetchThreads } = useActions(unboundThreadActions);
  const { fetchEvents } = useActions(unboundEventActions);
  const { setSelectedResource } = useActions(unboundGeneralActions);

  useEffect(() => {
    !isThreadsFetched && fetchThreads();
  }, [isThreadsFetched, fetchThreads]);

  useEffect(() => {
    !isEventsFetched && fetchEvents();
  }, [isEventsFetched, fetchEvents]);

  useEffect(() => {
    if (isEventsFetched && isThreadsFetched && !id && contents.length > 0) {
      setSelectedResource(contents[0].id);
    }
  }, [setSelectedResource, isEventsFetched, isThreadsFetched, id, contents]);

  return (
    <Container>
      {isThreadsFetched &&
        isEventsFetched &&
        contents.map(resource => (
          <InboxListItem
            key={resource.id}
            resource={resource}
            isSelected={resource.id === id}
          />
        ))}
    </Container>
  );
}
