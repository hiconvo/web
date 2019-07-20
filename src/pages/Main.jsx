import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import InboxSidebar from "../components/InboxSidebar";
import ThreadViewer from "../components/ThreadViewer";
import ThreadInfoBox from "../components/ThreadInfoBox";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr) ${themeGet(
  "sidebarWidth"
)}
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});
`;

export default function Main() {
  return (
    <Container>
      <InboxSidebar />
      <ThreadViewer />
      <ThreadInfoBox />
    </Container>
  );
}
