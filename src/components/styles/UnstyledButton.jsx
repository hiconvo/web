import styled from "styled-components";

import Box from "./Box";

const Button = styled(Box)`
  font-size: inherit;
  font-family: inherit;
  color: inherit;
  background-color: inherit;
  border: inherit;
  cursor: pointer;
`;

Button.defaultProps = {
  as: "button"
};

export default Button;
