import styled from "styled-components";
import { letterSpacing, colorStyle, textStyle, textAlign } from "styled-system";
import { textOverflow } from "./utils";

import Box from "./Box";

const Text = styled(Box)({
  textOverflow,
  letterSpacing,
  textStyle,
  textAlign,
  colorStyle
});

Text.defaultProps = {
  as: "span",
  display: "inline",
  color: "bodytext"
};

const Paragraph = styled(Text)({});

Paragraph.defaultProps = {
  as: "p",
  mt: 0,
  mb: 3,
  display: "block",
  lineHeight: "paragraph",
  color: "bodytext"
};

const Heading = styled(Text)({});

Heading.defaultProps = {
  as: "h1",
  display: "block",
  mt: [1, null, 2],
  mb: [2, null, 3],
  lineHeight: "title",
  color: "bodytext"
};

export { Text, Paragraph, Heading };
