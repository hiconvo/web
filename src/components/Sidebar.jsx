import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import ThreadList from "./ThreadList";

const Container = styled.div``;

const Fixed = styled.div`
  position: fixed;
  background-color: ${themeGet("colors.trueWhite")};
  top: ${themeGet("headerHeight")};
  left: ${themeGet("space.4")};
  width: calc(${themeGet("sidebarWidth")} - 0.1rem);
  height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("space.3")}) -
      ${themeGet("space.4")}
  );
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  border-radius: ${themeGet("sidebarChromeHeight")};
  box-shadow: ${themeGet("shadows.spread")};

  @media (min-width: ${themeGet("pageMaxWidthPx")}) {
    left: calc(
      ((100vw - ${themeGet("pageMaxWidth")}) / 2) + ${themeGet("space.4")}
    );
  }
`;

const TopContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-bottom: 0.1rem solid ${themeGet("colors.lightGray")};
`;

const BottomContainer = styled.div`
  height: ${themeGet("sidebarChromeHeight")};
  border-top: 0.1rem solid ${themeGet("colors.lightGray")};
`;

export default function Sidebar() {
  return (
    <Container>
      <Fixed>
        <TopContainer />
        <ThreadList />
        <BottomContainer />
      </Fixed>
    </Container>
  );
}
