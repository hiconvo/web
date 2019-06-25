import styled from "styled-components";
import { letterSpacing, colorStyle, textStyle, themeGet } from "styled-system";
import { textOverflow } from "./utils";

import Box from "./Box";

const Text = styled(Box)`
  ${textOverflow}
  ${letterSpacing}
  ${textStyle}
  ${colorStyle}
  text-align: ${props => props.textAlign};
  font-family: ${props => themeGet(props.fontFamily)(props)};
`;

Text.defaultProps = {
  as: "span",
  display: "inline",
  color: "bodytext",
  textAlign: "left",
  fontFamily: "fonts.sans"
};

const Paragraph = styled(Text)({});

Paragraph.defaultProps = {
  as: "p",
  mt: 0,
  mb: 3,
  display: "block",
  lineHeight: "paragraph",
  textAlign: "left",
  color: "bodytext"
};

const Heading = styled(Text)({});

Heading.defaultProps = {
  as: "h1",
  display: "block",
  mt: [1, null, 2],
  mb: [2, null, 3],
  lineHeight: "title",
  textAlign: "left",
  color: "bodytext"
};

export { Text, Paragraph, Heading };
