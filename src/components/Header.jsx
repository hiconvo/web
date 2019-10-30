import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import UserMenu from "./UserMenu";
import MobileLogoMenu from "./MobileLogoMenu";
import HeaderInfoMenu from "./HeaderInfoMenu";
import RealtimeNotifications from "./RealtimeNotifications";
import Logo from "./Logo";
import { Box, Button, Paragraph, theme } from "./styles";

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
  ${themeGet("media.phone")} {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  margin-left: ${themeGet("space.3")};

  ${themeGet("media.phone")} {
    display: none;
  }
`;

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

const NavItem = ({ to, text, active }) => (
  <Link to={to}>
    <NavItemInner active={active}>
      <Box
        style={{
          borderBottom: `0.1rem solid ${
            active ? theme.colors.black : "transparent"
          }`
        }}
      >
        {text}
      </Box>
    </NavItemInner>
  </Link>
);

const WrappedLogo = () => (
  <LogoWrapper>
    <Link style={{ width: "5rem", height: "5rem", display: "block" }} to="/">
      <Logo width="5rem" />
    </Link>
  </LogoWrapper>
);

export default () => {
  const isLoginPage = useRouteMatch("/login");
  const isForgotPage = useRouteMatch("/forgot");
  const isConvosPage = useRouteMatch("/convos");
  const isContactsPage = useRouteMatch("/contacts");
  const showNav = !(isLoginPage || isForgotPage);

  return (
    <Header>
      <Box flexDirection="row">
        <WrappedLogo />
        <MobileLogoMenu />
        {showNav && (
          <Nav>
            <NavItem to="/convos" text="Convos" active={isConvosPage} />
            <NavItem to="/contacts" text="Contacts" active={isContactsPage} />
          </Nav>
        )}
      </Box>
      <Box flexDirection="row" alignItems="center">
        <HeaderInfoMenu />
        <RealtimeNotifications />
        <UserMenu />
        {!showNav && (
          <Paragraph mb="0rem">
            <a href="https://hiconvo.com">What is Convo?</a>
          </Paragraph>
        )}
      </Box>
    </Header>
  );
};
