import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import { Box, theme } from "./styles";

const NavItemInner = styled.div`
  padding: ${themeGet("space.3")};
  color: ${props =>
    props.active
      ? themeGet("colors.black")(props)
      : themeGet("colors.gray")(props)};
  transition: color 0.2s ease;

  &:hover {
    color: ${themeGet("colors.black")};
  }
`;

export default function NavItem({ to, text }) {
  const isActive = useRouteMatch(to);

  return (
    <Link to={to}>
      <NavItemInner active={isActive}>
        <Box
          style={{
            borderBottom: `0.1rem solid ${
              isActive ? theme.colors.black : "transparent"
            }`
          }}
        >
          {text}
        </Box>
      </NavItemInner>
    </Link>
  );
}
