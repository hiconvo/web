import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { typography, textStyle } from "styled-system";
import marked from "marked";

export const MarkdownContainer = styled.div`
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

  p,
  .public-DraftStyleDefault-block {
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
    line-height: 1em;
  }

  ul {
    margin-left: ${themeGet("space.3")};
    margin-bottom: ${themeGet("space.3")};
    list-style: disc outside;
  }

  ol {
    margin-left: ${themeGet("space.3")};
    margin-bottom: ${themeGet("space.3")};
    list-style: decimal outside;
  }

  li {
    margin-bottom: ${themeGet("space.2")};
  }

  blockquote {
    padding-left: ${themeGet("space.3")};
    margin-right: ${themeGet("space.3")};
    margin-bottom: ${themeGet("space.3")};
    margin-top: ${themeGet("space.3")};
    border-left: ${themeGet("borders.lightGray")};

    p {
      line-height: 1.4em;
      font-size: ${themeGet("fontSizes.2")};
    }
  }

  ${typography}
  ${textStyle}
`;

MarkdownContainer.defaultProps = { fontSize: 2 };

const renderer = new marked.Renderer();
renderer.image = (text) => text;
renderer.heading = (text) => text;
renderer.hr = (text) => text;
renderer.table = (text) => text;
renderer.tablerow = (text) => text;
renderer.tablecell = (text) => text;
renderer.del = (text) => text;
renderer.checkbox = (text) => text;
renderer.html = (text) => escape(text);

export default function Markdown({ text, ...rest }) {
  return (
    <MarkdownContainer
      dangerouslySetInnerHTML={{
        __html: marked(text, { renderer: renderer, breaks: true, gfm: true })
      }}
      {...rest}
    />
  );
}
