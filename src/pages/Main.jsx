import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import Sidebar from "../components/Sidebar";
import Viewer from "../components/Viewer";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} auto ${themeGet(
  "sidebarWidth"
)}
  width: 100%;
`;

export default function Main() {
  return (
    <Container>
      <Sidebar />
      <Viewer />
      <div />
    </Container>
  );
}
