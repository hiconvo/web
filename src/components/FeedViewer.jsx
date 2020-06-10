import React from "react";

import { useSelectors } from "../redux";
import { getIsThreadsFetched, getThreads } from "../selectors";
import FeedItem from "./FeedItem";
import ThreadComposer from "./ThreadComposer";
import RegisterWarning from "./RegisterWarning";

import { Ripple, FloatingPill } from "./styles";

export default function FeedViewer() {
  const [isThreadsFetched, threads] = useSelectors(
    getIsThreadsFetched,
    getThreads
  );

  return (
    <div>
      <RegisterWarning />
      <FloatingPill>
        <ThreadComposer />
      </FloatingPill>
      {!isThreadsFetched && <Ripple />}
      {threads.map((thread) => thread.preview && <FeedItem thread={thread} />)}
    </div>
  );
}
