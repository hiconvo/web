import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import Box from "./Box";

const Button = styled(Box)`
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background-color: inherit;
  border: inherit;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
    border: none;
    box-shadow: 0 0 0 0.3rem ${themeGet("colors.primary300")};
  }
`;

Button.defaultProps = {
  as: "button",
  alignItems: "center"
};

export default Button;
