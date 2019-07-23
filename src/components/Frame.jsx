import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import NotificationsManager from "./NotificationsManager";
import Header from "./Header";

const Container = styled.div`
  width: calc(100% - ${themeGet("space.5")} * 2);
  max-width: calc(${themeGet("pageMaxWidth")} - ${themeGet("space.5")} * 2);
  height: 100vh;
  padding: 0 ${themeGet("space.5")};
  margin: auto;

  ${themeGet("media.phone")} {
    width: calc(100% - ${themeGet("space.4")} * 2);
    padding: 0 ${themeGet("space.4")};
  }
`;

const Slug = styled.div`
  height: ${themeGet("headerHeight")};
  width: 100%;
`;

const Footer = styled.footer``;

export default function Frame({ children }) {
  return (
    <Container>
      <NotificationsManager />
      <Header />
      <Slug />
      {children}
      <Footer />
    </Container>
  );
}
