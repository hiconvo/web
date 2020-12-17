import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format } from "date-fns";

import OpenGraphLink from "./OpenGraphLink";
import Markdown from "./Markdown";
import Photo from "./Photo";
import ContactSection from "./ContactSection";
import { Box, FloatingPill, Text } from "./styles";

const Container = styled.div`
  margin-top: ${themeGet("space.1")};
  max-height: 40rem;
  overflow: hidden;
  text-overflow: ellipses;
  position: relative;

  * {
    font-family: ${themeGet("fonts.serif")};
    line-height: 1.5em;
    font-size: ${themeGet("fontSizes.3")};
  }
`;

const Screen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 70%,
    rgba(255, 255, 255, 1)
  );
`;

export default function FeedItem({ thread }) {
  const history = useHistory();
  const responseCount = thread.responseCount;

  function handleClick(e) {
    history.push(`/convos/${thread.id}`);
  }

  return (
    <FloatingPill>
      <Box pb={3} cursor="pointer">
        <div onClick={handleClick}>
          <ContactSection user={thread.owner} users={thread.users} />
        </div>
        <Box mb={2}>
          <div onClick={handleClick}>
            <Container>
              <Markdown text={thread.body} />
              {thread.body.length > 256 && <Screen />}
            </Container>
          </div>
          {thread.photos && thread.photos.length > 0 && (
            <Box mt={3} mb={2}>
              <Photo src={thread.photos[0]} height="auto" width="100%" />
            </Box>
          )}
          {thread.link && (
            <Box my={3}>
              <OpenGraphLink link={thread.link} />
            </Box>
          )}
        </Box>
        <div onClick={handleClick}>
          <Box flexDirection="row" justifyContent="space-between" mt={2}>
            <Box>
              <Text fontSize={1} color="gray">
                {responseCount} {responseCount === 1 ? "response" : "responses"}{" "}
                &middot; Write a response
              </Text>
            </Box>
            <Box>
              <Text fontSize={1} color="gray">
                {thread.createdAt &&
                  format(new Date(thread.createdAt), "MMM d")}
              </Text>
            </Box>
          </Box>
        </div>
      </Box>
    </FloatingPill>
  );
}
