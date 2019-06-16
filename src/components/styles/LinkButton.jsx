import React from "react";
import styled from "styled-components";

import { Text } from "./typography";
import { Link } from "react-router-dom";
import { themeGet } from "styled-system";

const LinkWrapper = styled(Text)`
  transition: color ease ${themeGet("animations.fast")};

  &:hover {
    color: ${themeGet("colors.mediumGray")};
  }
`;

function LinkButton({ to, children, ...rest }) {
  return (
    <LinkWrapper {...rest}>
      <Link to={to}>{children}</Link>
    </LinkWrapper>
  );
}

export default LinkButton;
