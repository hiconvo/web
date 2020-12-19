import React from "react";

import { useSelectors } from "../redux";
import { getIsThreadsFetched, getThreads } from "../selectors";
import FeedItem from "./FeedItem";
import ThreadComposer from "./ThreadComposer";
import RegisterWarning from "./RegisterWarning";

import { Ripple, FloatingPill, Box } from "./styles";

export default function FeedViewer() {
  const [isThreadsFetched, threads] = useSelectors(
    getIsThreadsFetched,
    getThreads
  );

  return (
    <div>
      <RegisterWarning />
      <Box display={["none", "block", "block"]}>
        <FloatingPill>
          <ThreadComposer />
        </FloatingPill>
      </Box>
      {!isThreadsFetched && <Ripple />}
      {threads.map((thread) => (
        <FeedItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
