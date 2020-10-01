import React from "react";
import styled from "styled-components";
import {
  buttonStyle,
  space,
  layout,
  flexbox,
  border,
  background,
  color,
  position,
  shadow
} from "styled-system";
import { float, cursor, overflow, whiteSpace } from "./utils";
import { themeGet } from "@styled-system/theme-get";

import Spinner from "./Spinner";

const Button = styled("button")(
  buttonStyle,
  space,
  layout,
  whiteSpace,
  flexbox,
  border,
  color,
  background,
  position,
  float,
  overflow,
  cursor,
  shadow,

  (props) => ({
    transition: `all ${themeGet("animations.fast")(props)} ease-in-out`,
    cursor: props.disabled ? "default" : "pointer",
    opacity: props.disabled ? themeGet("opacities.1")(props) : 1,
    pointerEvents: props.disabled ? "none" : "initial",
    "&:focus, &:active": {
      outline: "none",
      border: "none",
      "box-shadow": `0 0 0 0.3rem ${themeGet("colors.primary300")(props)}`
    }
  })
);

Button.defaultProps = {
  as: "button"
};

Button.displayName = "Button";

const WrappedButton = React.forwardRef(
  ({ isLoading, children, ...rest }, ref) => {
    return (
      <Button disabled={isLoading} ref={ref} {...rest}>
        {isLoading ? <Spinner color={rest.color} size="1.2rem" /> : children}
      </Button>
    );
  }
);

WrappedButton.defaultProps = {
  display: "flex",
  flexDirection: "row",
  border: 0,
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans",
  fontWeight: "semiBold",
  letterSpacing: "spaced",
  lineHeight: "normal",
  textDecoration: "none",
  whiteSpace: "nowrap",
  textAlign: "center"
};

export default WrappedButton;
