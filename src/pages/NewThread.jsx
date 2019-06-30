import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import Sidebar from "../components/Sidebar";
import ThreadForm from "../components/ThreadForm";
import { Box, Paragraph, Heading, Text } from "../components/styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} auto ${themeGet(
  "sidebarWidth"
)}
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});
`;

export default function NewThread() {
  return (
    <Container>
      <Sidebar />
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
            <Text as="pre" whiteSpace="pre-wrap" fontFamily="mono">
              my-subject-4231@mail.hiconvo.com
            </Text>
            . Your personal email address is kept private, as well as those of
            the participants.
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
