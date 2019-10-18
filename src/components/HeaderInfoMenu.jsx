import React from "react";
import { Route } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getIsOwnerOfSelectedResource } from "../selectors";
import { ActionButton, Icon, Text, Dropdown } from "./styles";
import ResourceInfoBox from "./ResourceInfoBox";

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

  color: ${themeGet("colors.bodytext")};
`;

const InfoBoxContainer = styled.div`
  padding: ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;

  display: none;
  ${themeGet("media.tablet")} {
    display: ${props => (props.isOpen ? "flex" : "none")};
  }

  ${themeGet("media.phone")} {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw - ${themeGet("space.4")} * 2);
    height: 100vh;
  }
`;

const CloseButton = styled.div`
  display: none;

  ${themeGet("media.phone")} {
    display: block;
    position: fixed;
    right: 2rem;
    top: 2rem;
  }
`;

function InfoDropdownButton({ onClick }) {
  const [isOwner] = useSelectors(getIsOwnerOfSelectedResource);
  return (
    <InfoButton
      onClick={onClick}
      display="flex"
      flexDirection="row"
      alignItems="center"
      mr={2}
    >
      <Icon
        name={isOwner ? "edit" : "group"}
        fontSize={4}
        mr={2}
        color="inherit"
      />
      <Text fontSize={3} color="inherit">
        Info
      </Text>
    </InfoButton>
  );
}

export default function HeaderInfoMenu() {
  return (
    <Route
      path="/convos"
      exact
      render={() => (
        <Dropdown
          renderAnchor={({ onClick }) => (
            <InfoDropdownButton onClick={onClick} />
          )}
        >
          {({ isOpen, isVisible, handleToggle }) => (
            <InfoBoxContainer isOpen={isOpen} isVisible={isVisible}>
              <CloseButton>
                <Icon onClick={handleToggle} name="close" fontSize={5} />
              </CloseButton>
              <ResourceInfoBox position="static" />
            </InfoBoxContainer>
          )}
        </Dropdown>
      )}
    />
  );
}
