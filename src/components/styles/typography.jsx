import styled from "styled-components";
import { textAlign, letterSpacing, colorStyle, textStyle } from "styled-system";

import Box from "./Box";

const Text = styled(Box)({
  textAlign,
  letterSpacing,
  textStyle,
  colorStyle
});

Text.defaultProps = {
  as: "span",
  display: "inline"
};

const Paragraph = styled(Text)({});

Paragraph.defaultProps = {
  as: "p",
  mt: 0,
  mb: 3,
  display: "block",
  lineHeight: "paragraph"
};

const Heading = styled(Text)({});

Heading.defaultProps = {
  as: "h1",
  display: "block",
  mt: [1, null, 2],
  mb: [2, null, 3],
  lineHeight: "title"
};

export { Text, Paragraph, Heading };
