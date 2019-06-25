import React from "react";
import styled from "styled-components";
import Box from "./Box";
import Spinner from "./Spinner";
import {
  themeGet,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  display
} from "styled-system";

const Button = styled(Box)(
  props => ({
    appearance: "none",
    border: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: themeGet("fonts.sans")(props),
    fontWeight: themeGet("fontWeights.semiBold")(props),
    letterSpacing: themeGet("letterSpacings.spaced")(props),
    lineHeight: themeGet("lineHeights.normal")(props),
    textDecoration: "none",
    userSelect: "none",
    transition: `background ${themeGet("animations.fast")(props)} ease-in-out`,
    cursor: props.disabled ? "default" : "pointer",
    opacity: props.disabled ? themeGet("opacities.1")(props) : 1,
    pointerEvents: props.disabled ? "none" : "initial",
    whiteSpace: "nowrap",
    textAlign: props.textAlign || "center"
  }),
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  display
);

Button.defaultProps = {
  as: "button"
};

Button.displayName = "Button";

function WrappedButton({ isLoading, children, ...rest }) {
  return (
    <Button disabled={isLoading} {...rest}>
      {isLoading ? <Spinner color={rest.color} size="1.2rem" /> : children}
    </Button>
  );
}

WrappedButton.defaultProps = {
  variant: "primary",
  width: [1, "auto"],
  p: 3,
  mb: 2,
  fontSize: 2
};

export default WrappedButton;
