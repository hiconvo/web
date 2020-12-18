import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Helmet } from "react-helmet";

import NotificationsManager from "./NotificationsManager";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Main = styled.main`
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

export default function Frame({ children }) {
  return (
    <Main>
      <Helmet>
        <title>Convo</title>
      </Helmet>
      <NotificationsManager />
      <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </Main>
  );
}
