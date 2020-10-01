import styled from "styled-components";
import {
  space,
  layout,
  typography,
  flexbox,
  border,
  background,
  color,
  position,
  shadow
} from "styled-system";
import {
  float,
  cursor,
  overflow,
  overflowY,
  whiteSpace,
  textOverflow
} from "./utils";

const Box = styled("div")(
  {
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
    outline: "none"
  },
  space,
  layout,
  typography,
  whiteSpace,
  textOverflow,
  flexbox,
  border,
  color,
  background,
  position,
  float,
  overflow,
  overflowY,
  cursor,
  shadow
);

Box.defaultProps = {
  as: "div",
  fontFamily: "sans",
  fontSize: 2,
  lineHeight: "normal",
  fontWeight: "regular",
  display: "flex",
  flexDirection: "column"
};

Box.displayName = "Box";

export default Box;
