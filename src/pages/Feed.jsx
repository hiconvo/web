import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

// import { getUser } from "../selectors";
// import { useSelectors } from "../redux";

import { baseLayout } from "./styles";
import FeedViewer from "../components/FeedViewer";
// import UpcomingEventsSidebar from "../components/UpcomingEventsSidebar";
// import ContactInfoBox from "../components/ContactInfoBox";

export const Container = styled.div`
  ${baseLayout}

  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr) ${themeGet(
  "sidebarWidth"
)};

  ${themeGet("media.tablet")} {
    grid-template-columns: 0.3fr minmax(0, 1fr) 0.3fr;

    & > div:nth-child(1) {
      visibility: hidden;
    }

    & > div:nth-child(3) {
      visibility: hidden;
    }
  }

  ${themeGet("media.phone")} {
    grid-template-columns: 0 minmax(0, 1fr) 0;

    & > div:nth-child(1) {
      visibility: hidden;
    }

    & > div:nth-child(3) {
      visibility: hidden;
    }
  }
`;

export default function Feed() {
  // const [user] = useSelectors(getUser);

  return (
    <Container>
      <div />
      <FeedViewer />
      <div />
    </Container>
  );
}
