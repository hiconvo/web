import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import { useSelectors, useActions } from "../redux";
import { getMessagesByThreadId } from "../selectors";
import * as unboundActions from "../actions/messages";
import CommentsSection from "./CommentsSection";
import OpenGraphLink from "./OpenGraphLink";
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
  const [messages] = useSelectors(getMessagesByThreadId(id));
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

  if (!thread) return <Ripple />;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FloatingPill>
        <ContactSection user={thread.owner} users={thread.users} />
        <Container>
          <Markdown text={thread.body || ""} />
        </Container>

        {thread.photos && thread.photos.length > 0 && (
          <Box my={3}>
            <Photo src={thread.photos[0]} height="auto" width="100%" />
          </Box>
        )}
        {thread.link && (
          <Box my={3}>
            <OpenGraphLink link={thread.link} />
          </Box>
        )}

        <CommentsSection
          isLoading={isLoading}
          createMessage={createThreadMessage}
          messages={messages}
          threadId={thread.id}
        />
      </FloatingPill>
    </motion.div>
  );
}
