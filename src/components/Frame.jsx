import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import Logo from "./Logo";

const Container = styled.div`
  width: calc(100% - ${themeGet("space.5")} * 2);
  max-width: calc(${themeGet("pageMaxWidth")} - ${themeGet("space.5")} * 2);
  height: 100vh;
  padding: 0 ${themeGet("space.5")};
  margin: auto;
`;

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
`;

const Slug = styled.div`
  height: ${themeGet("headerHeight")};
  width: 100%;
`;

const Footer = styled.footer``;

const LogoWrapper = styled.div`
  border-radius: 3rem;
  transition: all ease ${themeGet("animations.fast")};

  &:hover {
    box-shadow: ${themeGet("shadows.normal")};
  }
`;

const WrappedLogo = () => (
  <LogoWrapper>
    <Link style={{ width: "5rem", height: "5rem", display: "block" }} to="/">
      <Logo width="5rem" />
    </Link>
  </LogoWrapper>
);

export default function Frame({ children }) {
  return (
    <Container>
      <Header>
        <WrappedLogo />
        <UserMenu />
      </Header>
      <Slug />
      {children}
      <Footer />
    </Container>
  );
}
