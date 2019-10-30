import React from "react";
import styled from "styled-components";
import { buttonStyle, color } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

import Box from "./Box";
import Spinner from "./Spinner";
import { whiteSpace } from "./utils";

const Button = styled(Box)(whiteSpace, buttonStyle, color, props => ({
  appearance: "none",
  userSelect: "none",
  transition: `all ${themeGet("animations.fast")(props)} ease-in-out`,
  cursor: props.disabled ? "default" : "pointer",
  opacity: props.disabled ? themeGet("opacities.1")(props) : 1,
  pointerEvents: props.disabled ? "none" : "initial"
}));

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
  variant: "primary",
  width: [1, "auto"],
  p: 3,
  mb: 2,
  fontSize: 2,
  flexDirection: "row",
  border: 0,
  display: "flex",
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
