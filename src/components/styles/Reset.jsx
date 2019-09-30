import React from "react";
import { createGlobalStyle } from "styled-components";

import CropperStyles from "./Cropper";
import theme from "./theme";

const Globals = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    font-size: 12px;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  body {
    background-color: #fafafa;
    color: ${theme.colors.black};
    font-family: ${theme.fonts.sans};
    font-size: ${theme.fontSizes[1]};
    line-height: ${theme.lineHeights.normal};
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }

  ${theme.media.phone} {
    html {
      font-size: 8px;
    }
  }
`;

export default ({ children }) => (
  <React.Fragment>
    <Globals />
    <CropperStyles />
    {children}
  </React.Fragment>
);
