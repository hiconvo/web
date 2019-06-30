import React from "react";
import styled from "styled-components";
import { space, color, layout, typography, flexbox } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import { cursor, float } from "./utils";

const Icon = styled.i`
  ${layout}
  ${flexbox}
  ${space}
  ${color}
  ${typography}
  ${cursor}
  ${float}
  border: 0;
  background-color: transparent;
  &:hover {
    color: ${themeGet("colors.mediumGray")};
  }
  transition: all ease 0.2s;
`;

Icon.defaultProps = {
  display: "inline",
  className: "material-icons",
  cursor: "pointer",
  padding: 0,
  fontSize: "inherit"
};

export default props => {
  const { name, ...rest } = props;
  return <Icon {...rest}>{name}</Icon>;
};
