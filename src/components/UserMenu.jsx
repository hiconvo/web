import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useRedux } from "../redux";
import { getIsLoggedIn } from "../selectors";
import { Dropdown, LinkButton } from "./styles";
import LogoutButton from "./LogoutButton";

const HoverRing = styled.div`
  padding: ${themeGet("space.1")};
  transition: background-color ease ${themeGet("animations.fast")};
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${themeGet("colors.snow")};
  }
`;

const NullAvatar = styled.div`
  background-color: ${themeGet("colors.lightGray")};
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
`;

const List = styled.ul`
  width: 16rem;
  background-color: ${themeGet("colors.trueWhite")};
  border: 0.1rem solid ${themeGet("colors.snow")};
  box-shadow: ${themeGet("shadows.normal")};
`;

const Item = styled.li`
  padding: ${themeGet("space.1")};
  font-size: ${themeGet("fontSizes.1")};
`;

export default function UserMenu(props) {
  const [[isLoggedIn]] = useRedux([getIsLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <Dropdown
      renderAnchor={({ onClick }) => (
        <HoverRing onClick={onClick}>
          <NullAvatar />
        </HoverRing>
      )}
    >
      <List>
        <Item>
          <LinkButton to="/settings" width="100%">
            Settings
          </LinkButton>
        </Item>
        <Item>
          <LogoutButton />
        </Item>
      </List>
    </Dropdown>
  );
}