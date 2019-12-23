import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import { getThreads, getIsThreadsFetched } from "../selectors";
import * as unboundThreadActions from "../actions/threads";
import FeedItem from "./FeedItem";
import ThreadComposer from "./ThreadComposer";

import { Ripple, FloatingPill } from "./styles";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding: 0;
  }
`;

export default function FeedViewer() {
  const [threads, isThreadsFetched] = useSelectors(
    getThreads,
    getIsThreadsFetched
  );
  const { fetchThreads } = useActions(unboundThreadActions);

  useEffect(() => {
    !isThreadsFetched && fetchThreads();
  }, [isThreadsFetched, fetchThreads]);

  // Animation stuff. A little messy to put it here, but I'm lazy.
  const item = {
    hidden: { opacity: 0 },
    show: i => ({ opacity: 1, transition: { delay: i * 0.01 } })
  };

  return (
    <Container>
      <FloatingPill>
        <ThreadComposer />
      </FloatingPill>
      {!isThreadsFetched && <Ripple />}
      {threads.map((thread, idx) => (
        <motion.div
          key={thread.id}
          variants={item}
          custom={idx}
          initial="hidden"
          animate="show"
        >
          {thread.preview && <FeedItem thread={thread} />}
        </motion.div>
      ))}
    </Container>
  );
}
