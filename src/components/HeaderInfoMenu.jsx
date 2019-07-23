import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { ActionButton, Icon, Text, Dropdown } from "./styles";
import ThreadInfoBox from "./ThreadInfoBox";

const InfoButton = styled(ActionButton)`
  display: none;
  ${themeGet("media.tablet")} {
    display: flex;
  }

  padding: ${themeGet("space.2")} ${themeGet("space.3")};
  background-color: ${themeGet("colors.veryLightGray")};

  &:hover {
    background-color: ${themeGet("colors.lightGray")};
    color: ${themeGet("colors.bodytext")};
  }
`;

const InfoBoxContainer = styled.div`
  display: none;
  ${themeGet("media.tablet")} {
    display: flex;
  }

  padding: ${themeGet("space.4")};
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

function InfoDropdownButton({ onClick }) {
  return (
    <InfoButton
      onClick={onClick}
      display="flex"
      flexDirection="row"
      alignItems="center"
      mr={2}
    >
      <Icon name="group" fontSize={4} mr={2} color="inherit" />
      <Text fontSize={3} color="inherit">
        Info
      </Text>
    </InfoButton>
  );
}

export default function HeaderInfoMenu() {
  return (
    <Dropdown
      renderAnchor={({ onClick }) => <InfoDropdownButton onClick={onClick} />}
    >
      {({ isOpen }) => (
        <InfoBoxContainer isOpen={isOpen}>
          <ThreadInfoBox position="static" />
        </InfoBoxContainer>
      )}
    </Dropdown>
  );
}
