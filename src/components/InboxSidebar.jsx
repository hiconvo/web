import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getThreadsCount } from "../selectors";
import ThreadList from "./ThreadList";
import { LinkButton, Icon, Dropdown, Button } from "./styles";

const Container = styled.div``;

const Fixed = styled.div`
  position: fixed;
  background-color: ${themeGet("colors.trueWhite")};
  top: auto;
  left: auto;
  width: calc(${themeGet("sidebarWidth")} - 0.1rem);
  height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("space.3")}) -
      ${themeGet("space.5")}
  );
  max-height: 70rem;
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
  overflow: hidden;

  @media (min-width: ${themeGet("pageMaxWidthPx")}) {
    left: calc(
      ((100vw - ${themeGet("pageMaxWidth")}) / 2) + ${themeGet("space.5")}
    );
  }
`;

const TopContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-bottom: 0.1rem solid ${themeGet("colors.veryLightGray")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BottomContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-top: 0.1rem solid ${themeGet("colors.veryLightGray")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeGet("colors.mediumGray")};
  font-size: ${themeGet("fontSizes.0")};
`;

const DropdownItemsContainer = styled.div`
  flex-direction: column;
  margin-top: -0.2rem;
  background-color: ${themeGet("colors.trueWhite")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;
  display: ${props => (props.isOpen ? "flex" : "none")};
  border-top: ${themeGet("borders.lightGray")};
`;

function Top() {
  return (
    <TopContainer>
      <Dropdown
        width="100%"
        side="left"
        stretch
        renderAnchor={({ onClick }) => (
          <Button variant="brand" mb={0} width="100%" onClick={onClick}>
            <Icon name="add" mr={1} fontSize="2.2rem" /> Create
          </Button>
        )}
      >
        {({ isOpen, isVisible, handleToggle }) => (
          <DropdownItemsContainer
            isOpen={isOpen}
            isVisible={isVisible}
            onClick={handleToggle}
          >
            <LinkButton
              to="/convos/new"
              variant="brand"
              alignItems="flex-start"
              display="flex"
              mb="0"
              fontSize={[1]}
            >
              <Icon name="mail_outline" mr={1} fontSize="2.2rem" /> New Convo
            </LinkButton>
            <LinkButton
              to="/events/new"
              variant="brand"
              alignItems="flex-start"
              display="flex"
              mb="0"
              fontSize={[1]}
            >
              <Icon name="event" mr={1} fontSize="2.2rem" /> New Event
            </LinkButton>
          </DropdownItemsContainer>
        )}
      </Dropdown>
    </TopContainer>
  );
}

function Bottom() {
  const [threadsCount] = useSelectors(getThreadsCount);
  const descriptor = threadsCount === 1 ? "Convo" : "Convos";
  return (
    <BottomContainer>
      {threadsCount} {descriptor}
    </BottomContainer>
  );
}

export default function InboxSidebar() {
  return (
    <Container>
      <Fixed>
        <Top />
        <ThreadList />
        <Bottom />
      </Fixed>
    </Container>
  );
}
