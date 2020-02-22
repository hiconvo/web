import React, { useState, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getIsLoggedIn, getUser } from "../selectors";
import {
  Dropdown,
  LinkButton,
  Button,
  Box,
  Heading,
  Paragraph,
  Text,
  Icon
} from "./styles";
import LogoutButton from "./LogoutButton";
import LoginWithGoogle from "./LoginGoogle";
import LoginWithFacebook from "./LoginFacebook";

const Avatar = styled.div`
  display: flex;
  background-color: ${themeGet("colors.lightGray")};
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 100%;
  transition: all ease ${themeGet("animations.fast")};
  cursor: pointer;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: contain;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: ${themeGet("shadows.normal")};
  }
`;

const List = styled.ul`
  display: ${props => (props.isOpen ? "block" : "none")};
  width: 16rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;
`;

const SignUpContainer = styled.div`
  display: ${props => (props.isOpen ? "block" : "none")};
  width: auto;
  background-color: ${themeGet("colors.primary100")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;
  padding: ${themeGet("space.3")};
`;

const Item = styled.li`
  font-size: ${themeGet("fontSizes.2")};
`;

export default function UserMenu() {
  const [isLoggedIn, user] = useSelectors(getIsLoggedIn, getUser);
  const [isInitialOpen, setIsInitialOpen] = useState(false);
  const timeout = useRef(null);

  if (!isLoggedIn) return null;

  if (!(user.isPasswordSet || user.isGoogleLinked || user.isFacebookLinked)) {
    if (!timeout.current) {
      timeout.current = setTimeout(() => setIsInitialOpen(true), 2000);
    }

    return (
      <Dropdown
        initialState={isInitialOpen ? "open" : "closed"}
        renderAnchor={({ onClick }) => (
          <Avatar src={user.avatar} onClick={onClick}>
            {!user.avatar && <Icon name="person" fontSize={4} />}
          </Avatar>
        )}
      >
        {({ isOpen, isVisible, handleToggle }) => (
          <SignUpContainer
            isOpen={isOpen}
            isVisible={isVisible}
            onClick={handleToggle}
          >
            <Box>
              <Heading
                as="h2"
                fontSize={3}
                fontWeight="semiBold"
                color="trueBlack"
                mb={1}
              >
                Create your Convo account in one click
              </Heading>
              <Paragraph fontSize={1} color="darkGray">
                Link your Google or Facebook account associated with{" "}
                <Text
                  fontFamily="mono"
                  fontSize={1}
                  style={{ wordBreak: "break-all" }}
                >
                  {user.email}
                </Text>{" "}
                to complete your profile, send messages, and create convos and
                events of your own.{" "}
                <Text
                  as="a"
                  href="https://convo.events"
                  target="_blank"
                  fontWeight="semiBold"
                  fontSize={1}
                >
                  Learn more.
                </Text>
              </Paragraph>
            </Box>
            <Box>
              <LoginWithGoogle />
              <LoginWithFacebook />
            </Box>
          </SignUpContainer>
        )}
      </Dropdown>
    );
  }

  return (
    <Dropdown
      renderAnchor={({ onClick }) => (
        <Avatar src={user.avatar} onClick={onClick}>
          {!user.avatar && <Icon name="person" fontSize={4} />}
        </Avatar>
      )}
    >
      {({ isOpen, isVisible, handleToggle }) => (
        <List isOpen={isOpen} isVisible={isVisible} onClick={handleToggle}>
          <Item>
            <Button
              as="a"
              variant="tertiary"
              textAlign="left"
              href="https://convo.events"
              width="100%"
              justifyContent="flex-start"
              mb={0}
            >
              What is Convo?
            </Button>
            <LinkButton
              to="/settings"
              width="100%"
              justifyContent="flex-start"
              mb={0}
            >
              Settings
            </LinkButton>
          </Item>
          <Item>
            <LogoutButton />
          </Item>
        </List>
      )}
    </Dropdown>
  );
}
