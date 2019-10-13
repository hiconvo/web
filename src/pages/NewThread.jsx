import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import InboxSidebar from "../components/InboxSidebar";
import ThreadForm from "../components/ThreadForm";
import { Box, Paragraph, Heading, Text } from "../components/styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr) ${themeGet(
      "sidebarWidth"
    )};
  width: 100%;
  height: auto;
  min-height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("footerHeight")})
  );

  ${themeGet("media.tablet")} {
    grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr) 0;
    & > div:nth-child(3) {
      visibility: hidden;
    }
  }

  ${themeGet("media.phone")} {
    grid-template-columns: 0 minmax(0, 1fr) 0;
    & > div:nth-child(1) {
      visibility: hidden;
    }
    & > div:nth-child(3) {
      visibility: hidden;
    }
  }
`;

export default function NewThread() {
  return (
    <Container>
      <InboxSidebar />
      <ThreadForm />
      <Box>
        <Box position="fixed" width="28rem">
          <Heading fontSize={4} color="darkGray">
            Start a conversation
          </Heading>
          <Paragraph fontSize={1} color="gray" lineHeight="1.3em">
            Convo is email based. When you create a convo, we create a custom
            email address that only you and the people you invite can use -
            something like{" "}
            <Text as="code" whiteSpace="pre-wrap" fontFamily="mono">
              my-subject-4231@mail.hiconvo.com
            </Text>
            . Your personal email address is kept private, as are those of the
            participants.
          </Paragraph>
          <Paragraph fontSize={1} color="gray" lineHeight="1.3em">
            You can respond to the convo here, or via your email client, such as
            GMail or Outlook. There is no need to download any apps or check any
            websites for updates.
          </Paragraph>
          <Paragraph fontSize={1} color="gray" lineHeight="1.3em">
            You can leave convos or block people from starting convos with you
            at any time.
          </Paragraph>
        </Box>
      </Box>
    </Container>
  );
}
