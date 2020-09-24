import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { typography, textStyle } from "styled-system";
import marked from "marked";

const Container = styled.div`
  line-height: 1.5em;
  word-break: break-word;

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
    margin-bottom: ${themeGet("space.3")};
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
    margin-left: ${themeGet("space.4")};
    margin-bottom: ${themeGet("space.3")};
    list-style: disc outside;
  }

  li {
    margin-bottom: ${themeGet("space.2")};
  }

  ol {
    margin-left: ${themeGet("space.2")};
    margin-bottom: ${themeGet("space.2")};
    list-style: decimal inside;
  }

  blockquote {
    padding-left: ${themeGet("space.3")};
    margin-right: ${themeGet("space.3")};
    margin-bottom: ${themeGet("space.3")};
    border-left: ${themeGet("borders.lightGray")};

    p {
      line-height: 1.4em;
      font-size: ${themeGet("fontSizes.2")};
    }
  }

  ${typography}
  ${textStyle}
`;

Container.defaultProps = { fontSize: 2 };

export default function Markdown({ text, ...rest }) {
  return (
    <Container dangerouslySetInnerHTML={{ __html: marked(text) }} {...rest} />
  );
}
