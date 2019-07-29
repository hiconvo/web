import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import MobileLogoMenu from "./MobileLogoMenu";
import HeaderInfoMenu from "./HeaderInfoMenu";
import Logo from "./Logo";
import { Box } from "./styles";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${themeGet("headerHeight")};
  width: calc(100% - ${themeGet("space.5")} * 2);
  max-width: calc(${themeGet("pageMaxWidth")} - ${themeGet("space.5")} * 2);
  margin: auto;
  z-index: 30;
  background: linear-gradient(
    #fafafa 15%,
    rgba(250, 250, 250, 0.8) 70%,
    rgba(250, 250, 250, 0)
  );

  ${themeGet("media.phone")} {
    width: calc(100% - ${themeGet("space.4")} * 2);
    padding: 0;
  }
`;

const LogoWrapper = styled.div`
  border-radius: 3rem;
  transition: all ease ${themeGet("animations.fast")};

  &:hover {
    box-shadow: ${themeGet("shadows.normal")};
  }

  ${themeGet("media.phone")} {
    display: none;
  }
`;

const WrappedLogo = () => (
  <LogoWrapper>
    <Link style={{ width: "5rem", height: "5rem", display: "block" }} to="/">
      <Logo width="5rem" />
    </Link>
  </LogoWrapper>
);

export default () => (
  <Header>
    <Box>
      <WrappedLogo />
      <MobileLogoMenu />
    </Box>
    <Box flexDirection="row" alignItems="center">
      <HeaderInfoMenu />
      <UserMenu />
    </Box>
  </Header>
);
