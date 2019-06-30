import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import marked from "marked";
import { format } from "date-fns";

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

  h1 {
    font-size: ${themeGet("fontSizes.5")};
    font-weight: bold;
    margin-bottom: ${themeGet("space.2")};
  }

  h2 {
    font-size: ${themeGet("fontSizes.4")};
    font-weight: bold;
    margin-bottom: ${themeGet("space.2")};
  }

  h3 {
    font-size: ${themeGet("fontSizes.3")};
    font-weight: bold;
    margin-bottom: ${themeGet("space.2")};
  }

  p {
    margin-bottom: ${themeGet("space.2")};
  }

  p:last-child {
    margin-bottom: 0;
  }

  a {
    text-decoration: underline;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }

  code {
    font-family: ${themeGet("fonts.mono")};
  }

  pre {
    font-family: ${themeGet("fonts.mono")};
    overflow-x: scroll;
    max-width: 70rem;
    padding: ${themeGet("space.2")};
    border-radius: ${themeGet("radii.small")};
    border: 0.1rem solid ${themeGet("colors.lightGray")};
    background-color: ${themeGet("colors.snow")};
    font-size: 1.4rem;
  }

  ul {
    margin-left: ${themeGet("space.2")};
    margin-bottom: ${themeGet("space.2")};
    list-style: disc inside;
  }

  ol {
    margin-left: ${themeGet("space.2")};
    margin-bottom: ${themeGet("space.2")};
    list-style: decimal inside;
  }
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
        {message.user.firstName} @ {format(message.timestamp, "MMM D")}
      </Metadata>
      <Container
        isAuthor={isAuthor}
        dangerouslySetInnerHTML={{ __html: marked(message.body) }}
      />
    </Relative>
  );
}
