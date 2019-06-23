import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import Sidebar from "../components/Sidebar";
import Viewer from "../components/Viewer";
import Contacts from "../components/Contacts";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} auto ${themeGet(
  "sidebarWidth"
)}
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});
`;

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <Viewer />
      <Contacts />
    </Container>
  );
}
