import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format } from "date-fns";

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
  margin-bottom: ${themeGet("space.5")};
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
    <Relative isAuthor={isAuthor}>
      <Metadata isAuthor={isAuthor}>
        {message.user.firstName} @{" "}
        {format(new Date(message.timestamp), "MMM d")}
      </Metadata>
      <Container isAuthor={isAuthor}>
        <Markdown text={message.body} fontSize={3} />
      </Container>
    </Relative>
  );
}
