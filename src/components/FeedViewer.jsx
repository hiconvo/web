import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getIsThreadsFetched } from "../selectors";
import FeedItem from "./FeedItem";
import ThreadComposer from "./ThreadComposer";

import { Ripple, FloatingPill } from "./styles";
import { useThreads } from "../hooks";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-right: ${themeGet("space.5")};
    padding-left: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function FeedViewer() {
  const [threads] = useThreads();
  const [isThreadsFetched] = useSelectors(getIsThreadsFetched);

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
