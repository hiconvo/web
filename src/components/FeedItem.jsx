import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import Markdown from "./Markdown";
import Photo from "./Photo";
import { Box, FloatingPill, Text, Paragraph, Avatar } from "./styles";

const Container = styled.div`
  margin-top: ${themeGet("space.2")};

  * {
    font-family: ${themeGet("fonts.serif")};
    line-height: 1.5em;
    font-size: ${themeGet("fontSizes.3")};
  }
`;

function ContactSection({ user, users }) {
  return (
    <Box flexDirection="row" alignItems="center" mb={3}>
      <Box mr={2}>
        <Avatar size="4.8rem" src={user.avatar} />
      </Box>
      <Box>
        <Paragraph mb={0} lineHeight="1em" mb={1}>
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
    <Box mb={3}>
      <FloatingPill>
        <Box pb={4}>
          <ContactSection user={thread.owner} users={thread.users} />
          <Container>
            <Markdown text={thread.preview && thread.preview.body} />
          </Container>
          {thread.preview.photos && thread.preview.photos.length > 0 && (
            <Box>
              <Photo src={thread.preview.photos[0]} />
            </Box>
          )}
        </Box>
      </FloatingPill>
    </Box>
  );
}
