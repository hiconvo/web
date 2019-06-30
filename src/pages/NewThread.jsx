import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import Sidebar from "../components/Sidebar";
import ThreadForm from "../components/ThreadForm";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} auto;
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});
`;

export default function NewThread() {
  return (
    <Container>
      <Sidebar />
      <ThreadForm />
    </Container>
  );
}
