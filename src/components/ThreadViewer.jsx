import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import { useSelectors, useActions } from "../redux";
import { getUser, getMessagesByThreadId } from "../selectors";
import * as unboundActions from "../actions/messages";
import Message from "./Message";
import MessageComposer from "./MessageComposer";
import { useReadReporting } from "../hooks";
import ContactSection from "./ContactSection";
import Photo from "./Photo";
import Markdown from "./Markdown";
import { Ripple, FloatingPill, Box } from "./styles";

const Container = styled.div`
  margin-top: ${themeGet("space.1")};
  margin-bottom: ${themeGet("space.3")};

  * {
    font-family: ${themeGet("fonts.serif")};
    line-height: 1.5em;
    font-size: ${themeGet("fontSizes.3")};
  }
`;

export default function ThreadViewer({ thread }) {
  const { id } = thread;
  const fetched = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [messages, user] = useSelectors(getMessagesByThreadId(id), getUser);
  const { fetchThreadMessages, createThreadMessage } = useActions(
    unboundActions
  );
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

  const topItem = messages[messages.length - 1];

  if (!topItem || isLoading || !thread) return <Ripple />;

  return (
    <div>
      <FloatingPill>
        <ContactSection user={thread.owner} users={thread.users} />
        <Container>
          {topItem && <Markdown text={topItem.body || ""} />}

          {topItem.photos && topItem.photos.length > 0 && (
            <Box mt={3}>
              <Photo src={topItem.photos[0]} height="auto" />
            </Box>
          )}
        </Container>
        <MessageComposer
          key={id}
          createMessage={createThreadMessage}
          backgroundColor="gray"
          height="8rem"
        />
      </FloatingPill>
      {messages
        .reverse()
        .slice(1)
        .map((message, idx) => (
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
