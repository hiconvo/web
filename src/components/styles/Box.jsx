import styled from "styled-components";
import {
  space,
  layout,
  typography,
  flexbox,
  border,
  background,
  color,
  position
} from "styled-system";
import { float, cursor, overflow } from "./utils";

const Box = styled("div")(
  {
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
    outline: 0
  },
  space,
  layout,
  typography,
  flexbox,
  border,
  color,
  background,
  position,
  float,
  overflow,
  cursor
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
