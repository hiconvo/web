import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import { useSelectors, useActions } from "../redux";
import { getUser, getMessagesByThreadId } from "../selectors";
import * as unboundActions from "../actions/messages";
import Message from "./Message";
import MessageComposer from "./MessageComposer";
import { useReadReporting } from "../hooks";
import { Ripple } from "./styles";

export default function ThreadViewer({ thread }) {
  const fetched = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [messages, user] = useSelectors(
    getMessagesByThreadId(thread.id),
    getUser
  );
  const { fetchThreadMessages } = useActions(unboundActions);
  const { id } = thread;
  const hasMessages = messages.length > 0;

  useEffect(() => {
    async function handleFetchMessages() {
      setIsLoading(true);
      try {
        await fetchThreadMessages(id);
      } catch (e) {}
      setIsLoading(false);
    }

    if (id && !isLoading && !hasMessages && !fetched.current[id]) {
      fetched.current[id] = true;
      handleFetchMessages();
    }
  }, [id, fetchThreadMessages, isLoading, hasMessages, fetched]);

  useReadReporting(thread);

  // Animation stuff. A little messy to put it here, but I'm lazy.
  const item = {
    hidden: { opacity: 0 },
    show: i => ({ opacity: 1, transition: { delay: i * 0.01 } })
  };

  return (
    <div>
      <MessageComposer key={id} />
      {isLoading && <Ripple />}
      {messages.map((message, idx) => (
        <motion.div
          key={message.id}
          variants={item}
          custom={idx}
          initial="hidden"
          animate="show"
        >
          <Message message={message} isAuthor={user.id === message.user.id} />
        </motion.div>
      ))}
    </div>
  );
}
