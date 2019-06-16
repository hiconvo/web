import styled from "styled-components";
import {
  space,
  width,
  height,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  borderRadius,
  color,
  position,
  flex,
  justifyContent,
  order,
  alignSelf,
  display,
  flexDirection,
  overflow,
  flexWrap,
  alignItems
} from "styled-system";
import { float, flexShrink, cursor, backgroundColor } from "./utils";

const Box = styled("div")(
  {
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
    outline: 0
  },
  space,
  width,
  height,
  position,
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  borderRadius,
  color,
  flex,
  flexShrink,
  flexWrap,
  justifyContent,
  alignItems,
  alignSelf,
  order,
  display,
  float,
  overflow,
  cursor,
  backgroundColor,
  flexDirection
);

Box.defaultProps = {
  as: "div",
  fontFamily: "main",
  fontSize: 2,
  lineHeight: "normal",
  fontWeight: "regular",
  color: "black",
  display: "flex",
  flexDirection: "column"
};

Box.displayName = "Box";

export default Box;
