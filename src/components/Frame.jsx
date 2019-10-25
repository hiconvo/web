import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";

import NotificationsManager from "./NotificationsManager";
import Header from "./Header";
import { Paragraph } from "./styles";

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

const Footer = styled.footer`
  height: ${themeGet("footerHeight")};
`;

export default function Frame({ children }) {
  return (
    <Container>
      <NotificationsManager />
      <Header />
      <Slug />
      <main>{children}</main>
      <Footer>
        <Paragraph fontSize={0} color="mediumGray" textAlign="center">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by{" "}
          <Link to="/convos/new?userId=Eg8KBFVzZXIQgICA-MWljwo">
            Alexander Richey
          </Link>{" "}
          in Seattle, WA.
          <br />
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </Paragraph>
      </Footer>
    </Container>
  );
}
