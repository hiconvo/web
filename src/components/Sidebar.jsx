import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors } from "../redux";
import { getThreadsCount } from "../selectors";
import ThreadList from "./ThreadList";
import { Button, Icon } from "./styles";

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

function Top() {
  return (
    <TopContainer>
      <Button variant="brand" width="100%" mb="0" fontSize={[1]}>
        New Convo <Icon name="mail_outline" ml={1} fontSize="2.2rem" />
      </Button>
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

export default function Sidebar() {
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
