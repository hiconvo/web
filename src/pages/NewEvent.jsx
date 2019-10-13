import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import InboxSidebar from "../components/InboxSidebar";
import EventForm from "../components/EventForm";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${themeGet("sidebarWidth")} minmax(0, 1fr);
  width: 100%;
  height: auto;
  min-height: calc(
    100vh - (${themeGet("headerHeight")} + ${themeGet("footerHeight")})
  );

  ${themeGet("media.phone")} {
    grid-template-columns: 0 minmax(0, 1fr);
    & > div:nth-child(1) {
      visibility: hidden;
    }
  }
`;

export default function NewEvent() {
  return (
    <Container>
      <InboxSidebar />
      <EventForm />
    </Container>
  );
}
