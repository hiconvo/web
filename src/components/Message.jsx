import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format } from "date-fns";

import { Box, Avatar } from "./styles";
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
  margin-top: ${themeGet("space.4")};
  flex-direction: ${(props) => (props.isAuthor ? "row-reverse" : "row")};
`;

const Metadata = styled.span`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: -2rem;
  ${(props) => (props.isAuthor ? "right" : "left")}: 0rem;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
`;

export default function Message({ message, threadId, eventId, isAuthor }) {
  return (
    <Box mb={2}>
      <Relative isAuthor={isAuthor}>
        <Box mx={1}>
          <Avatar src={message.user.avatar} size="3.6rem" />
        </Box>
        <Box>
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
            {format(new Date(message.createdAt), "MMM d")}
          </Metadata>
          <Container isAuthor={isAuthor}>
            <Markdown text={message.body} fontSize={3} />
          </Container>
        </Box>
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
