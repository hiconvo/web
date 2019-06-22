import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelectors, useActions } from "../redux";
import { getThreads } from "../selectors";
import * as unboundActions from "../actions/threads";
import ThreadListItem from "./ThreadListItem";

const ThreadsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function ThreadList() {
  const [threads] = useSelectors(getThreads);
  const { fetchThreads } = useActions(unboundActions);

  useEffect(() => {
    if (threads.length === 0) fetchThreads();
  }, [fetchThreads, threads]);

  return (
    <ThreadsContainer>
      {threads.map(thread => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </ThreadsContainer>
  );
}
