import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import Markdown from "./Markdown";
import Photo from "./Photo";
import { Box, FloatingPill, Text, Paragraph, Avatar } from "./styles";

const Container = styled.div`
  margin-top: ${themeGet("space.2")};
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

function ContactSection({ user, users }) {
  return (
    <Box flexDirection="row" alignItems="center" mb={3}>
      <Box mr={2}>
        <Avatar size="4.8rem" src={user.avatar} />
      </Box>
      <Box>
        <Paragraph lineHeight="1em" mb={1}>
          <Text fontWeight="semiBold" lineHeight="1em">
            {user.fullName}
          </Text>
        </Paragraph>
        <Paragraph mb={0} lineHeight="1em">
          <Text fontSize={1} color="gray" lineHeight="1em">
            Shared with {users.map(u => u.fullName).join(", ")}
          </Text>
        </Paragraph>
      </Box>
    </Box>
  );
}

export default function FeedItem({ thread }) {
  return (
    <FloatingPill>
      <Link to={`/convos/${thread.id}`}>
        <Box pb={3}>
          <ContactSection user={thread.owner} users={thread.users} />
          <Box mb={2}>
            <Container>
              <Markdown text={thread.preview && thread.preview.body} />
              {thread.preview.body.length > 256 && <Screen />}
            </Container>
            {thread.preview.photos && thread.preview.photos.length > 0 && (
              <Box>
                <Photo src={thread.preview.photos[0]} />
              </Box>
            )}
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mt={2}>
            <Box>
              <Text fontSize={1} color="gray">
                0 responses &middot; Write a response
              </Text>
            </Box>
            <Box>
              <Text fontSize={1} color="gray">
                {format(new Date(thread.preview.timestamp), "MMM d")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </FloatingPill>
  );
}
