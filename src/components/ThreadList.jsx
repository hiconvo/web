import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors, useActions } from "../redux";
import { getThreads, getSelectedThread } from "../selectors";
import * as unboundActions from "../actions/threads";
import ThreadListItem from "./ThreadListItem";

const ThreadsContainer = styled.ul`
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

export default function ThreadList() {
  const [threads, { id }] = useSelectors(getThreads, getSelectedThread);
  const { fetchThreads } = useActions(unboundActions);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return (
    <ThreadsContainer>
      {threads.map(thread => (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          isSelected={thread.id === id}
        />
      ))}
    </ThreadsContainer>
  );
}
