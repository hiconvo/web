import React from "react";
import { motion } from "framer-motion";

import { useSelectors } from "../redux";
import { getIsThreadsFetched } from "../selectors";
import FeedItem from "./FeedItem";
import ThreadComposer from "./ThreadComposer";
import RegisterWarning from "./RegisterWarning";

import { Ripple, FloatingPill } from "./styles";
import { useThreads } from "../hooks";

export default function FeedViewer() {
  const [threads] = useThreads();
  const [isThreadsFetched] = useSelectors(getIsThreadsFetched);

  return (
    <div>
      <RegisterWarning />
      <FloatingPill>
        <ThreadComposer />
      </FloatingPill>
      {!isThreadsFetched && <Ripple />}
      {threads.map((thread, idx) => (
        <motion.div
          key={thread.id}
          variants={{
            hidden: { opacity: 0 },
            show: i => ({ opacity: 1, transition: { delay: i * 0.01 } })
          }}
          custom={idx}
          initial="hidden"
          animate="show"
        >
          {thread.preview && <FeedItem thread={thread} />}
        </motion.div>
      ))}
    </div>
  );
}
