import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";

import NavItem from "./NavItem";
import UserMenu from "./UserMenu";
import MobileLogoMenu from "./MobileLogoMenu";
import HeaderInfoMenu from "./HeaderInfoMenu";
import RealtimeNotifications from "./RealtimeNotifications";
import Logo from "./Logo";
import { Box, Paragraph, LinkButton, Icon, Text } from "./styles";

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

const Slug = styled.div`
  height: ${themeGet("headerHeight")};
`;

export default () => {
  const isLoginPage = useRouteMatch("/login");
  const isForgotPage = useRouteMatch("/forgot");
  const isConvoPage = useRouteMatch("/convos/:id");
  const showNav = !(isLoginPage || isForgotPage);
  const convoPageCaveat = isConvoPage ? "none" : "flex";
  const loginPageCaveat = showNav ? "none" : "block";

  return (
    <React.Fragment>
      <Header>
        <Box flexDirection="row">
          <Box display={[loginPageCaveat, convoPageCaveat, "block"]}>
            <Link
              style={{ width: "5rem", height: "5rem", display: "block" }}
              to="/"
            >
              <Logo width="5rem" />
            </Link>
          </Box>

          {showNav && !isConvoPage && <MobileLogoMenu />}

          {isConvoPage && (
            <Box display={["flex", "flex", "none"]}>
              <LinkButton to="/convos" variant="gray" py="0.6rem" mb={0}>
                <Icon name="keyboard_backspace" mr={1} fontSize={4} />
                <Text fontSize={3}>Go back</Text>
              </LinkButton>
            </Box>
          )}

          {showNav && (
            <Box
              as="nav"
              display={["none", convoPageCaveat, "flex"]}
              flexDirection="row"
              ml={3}
            >
              <NavItem to="/events" text="Events" />
              <NavItem to="/contacts" text="Contacts" />
            </Box>
          )}
        </Box>

        <Box flexDirection="row" alignItems="center">
          <HeaderInfoMenu />
          <RealtimeNotifications />
          <UserMenu />

          {!showNav && (
            <Paragraph mb="0rem">
              <a href="https://convo.events">What is Convo?</a>
            </Paragraph>
          )}
        </Box>
      </Header>
      <Slug />
    </React.Fragment>
  );
};
