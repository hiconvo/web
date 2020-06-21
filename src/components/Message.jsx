import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format } from "date-fns";

import { Box } from "./styles";
import Markdown from "./Markdown";
import DeleteMessageButton from "./DeleteMessageButton";
import Photo from "./Photo";
import OpenGraphLink from "./OpenGraphLink";

const Container = styled.div`
  display: inline-block;
  clear: both;
  padding: ${themeGet("space.3")};
  background-color: ${(props) =>
    props.isAuthor
      ? props.theme.colors.primary100
      : props.theme.colors.veryLightGray};
  border-radius: ${themeGet("radii.normal")};
  font-family: ${themeGet("fonts.serif")};
  font-size: ${themeGet("fontSizes.3")};
  line-height: 1.5em;
  min-width: 0;
`;

const Relative = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.isAuthor ? "row-reverse" : "row")};
`;

const Metadata = styled.span`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: -2rem;
  ${(props) => (props.isAuthor ? "right" : "left")}: 1.6rem;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.mediumGray")};
`;

export default function Message({ message, threadId, eventId, isAuthor }) {
  return (
    <Box mb={5}>
      <Relative isAuthor={isAuthor}>
        <Metadata isAuthor={isAuthor}>
          {isAuthor && (
            <React.Fragment>
              <DeleteMessageButton
                threadId={threadId}
                eventId={eventId}
                messageId={message.id}
              />
              <Box px={1} fontSize="inherit">
                {" • "}
              </Box>
            </React.Fragment>
          )}
          {message.user.firstName} @{" "}
          {format(new Date(message.timestamp), "MMM d")}
        </Metadata>
        {message.body.length > 0 && (
          <Container isAuthor={isAuthor}>
            <Markdown text={message.body} fontSize={3} />
          </Container>
        )}
      </Relative>
      {message.photos && message.photos.length > 0 && (
        <Box flexDirection={isAuthor ? "row-reverse" : "row"} mt={3}>
          <Photo src={message.photos[0]} />
        </Box>
      )}
      {message.link && (
        <Box
          flexDirection={isAuthor ? "row-reverse" : "row"}
          alignSelf={isAuthor ? "flex-end" : "flex-start"}
          mt={3}
          maxWidth="40rem"
        >
          <OpenGraphLink link={message.link} />
        </Box>
      )}
    </Box>
  );
}
