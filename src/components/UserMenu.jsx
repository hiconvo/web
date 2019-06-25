import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";
import { Dropdown, LinkButton } from "./styles";
import LogoutButton from "./LogoutButton";

const NullAvatar = styled.div`
  background-color: ${themeGet("colors.lightGray")};
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 100%;
  transition: all ease ${themeGet("animations.fast")};
  cursor: pointer;

  &:hover {
    box-shadow: ${themeGet("shadows.normal")};
  }
`;

const List = styled.ul`
  width: 16rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isOpen ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  z-index: 30;
`;

const Item = styled.li`
  padding: ${themeGet("space.2")};
  font-size: ${themeGet("fontSizes.1")};
`;

export default function UserMenu() {
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <Dropdown renderAnchor={({ onClick }) => <NullAvatar onClick={onClick} />}>
      {({ isOpen }) => (
        <List isOpen={isOpen}>
          <Item>
            <LinkButton to="/settings" width="100%">
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
