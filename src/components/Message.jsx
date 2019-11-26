import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format } from "date-fns";

import { Box } from "./styles";
import Markdown from "./Markdown";

const Container = styled.div`
  display: inline-block;
  clear: both;
  padding: ${themeGet("space.3")};
  background-color: ${props =>
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
  flex-direction: ${props => (props.isAuthor ? "row-reverse" : "row")};
`;

const Metadata = styled.span`
  position: absolute;
  top: -2rem;
  ${props => (props.isAuthor ? "right" : "left")}: 1.6rem;
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.mediumGray")};
`;

export default function Message({ message, isAuthor }) {
  return (
    <Box mb={5}>
      <Relative isAuthor={isAuthor}>
        <Metadata isAuthor={isAuthor}>
          {message.user.firstName} @{" "}
          {format(new Date(message.timestamp), "MMM d")}
        </Metadata>
        <Container isAuthor={isAuthor}>
          <Markdown text={message.body} fontSize={3} />
        </Container>
      </Relative>
      {message.photos && message.photos.length > 0 && (
        <Box flexDirection={isAuthor ? "row-reverse" : "row"}>
          <div>
            <Box
              as="img"
              display="block"
              src={message.photos[0]}
              borderRadius="normal"
              width="auto"
              height="auto"
              maxWidth="100%"
              mt={2}
            />
          </div>
        </Box>
      )}
    </Box>
  );
}
