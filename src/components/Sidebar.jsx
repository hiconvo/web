import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import ThreadList from "./ThreadList";

const chromeHeight = "5rem";

const Container = styled.div``;

const Fixed = styled.div`
  position: fixed;
  top: ${themeGet("headerHeight")};
  left: ${themeGet("space.4")};
  width: calc(${themeGet("sidebarWidth")} - 0.1rem);
  height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("space.3")}) -
      ${themeGet("space.4")}
  );
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  border-radius: ${chromeHeight};

  @media (min-width: ${themeGet("pageMaxWidthPx")}) {
    left: calc(
      ((100vw - ${themeGet("pageMaxWidth")}) / 2) + ${themeGet("space.4")}
    );
  }
`;

const TopContainer = styled.div`
  height: ${chromeHeight};
`;

const BottomContainer = styled.div`
  height: ${chromeHeight};
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
