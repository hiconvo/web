import styled from "styled-components";
import { typography, colorStyle, textStyle } from "styled-system";
import { textOverflow, whiteSpace } from "./utils";

import Box from "./Box";

const Text = styled(Box)`
  ${textOverflow}
  ${typography}
  ${textStyle}
  ${colorStyle}
  ${whiteSpace}
  text-align: ${props => props.textAlign};
`;

Text.defaultProps = {
  as: "span",
  display: "inline",
  color: "bodytext",
  textAlign: "left",
  fontFamily: "sans"
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
  mb: [2, null, 3],
  lineHeight: "title",
  textAlign: "left",
  color: "bodytext",
  fontFamily: "sans"
};

export { Text, Paragraph, Heading };
