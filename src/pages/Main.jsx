import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors, useActions } from "../redux";
import { getThreads } from "../selectors";
import * as unboundActions from "../actions/threads";
import ThreadListItem from "../components/ThreadListItem";

const ThreadsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  margin: ${themeGet("space.5")} auto 0 auto;
  width: 100%;
  max-width: 80rem;
`;

export default function Main() {
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
