import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NotificationsManager from "./NotificationsManager";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import { Paragraph, Text } from "./styles";

const Container = styled.main`
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
      <Helmet>
        <title>Convo</title>
      </Helmet>
      <NotificationsManager />
      <Header />
      <Slug />
      <ScrollToTop />
      {children}
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
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.{" "}
          <Text
            as="a"
            href="https://convo.events/privacy"
            fontSize={0}
            color="mediumGray"
          >
            Privacy policy
          </Text>
          .{" "}
          <Text
            as="a"
            href="https://convo.events/terms"
            fontSize={0}
            color="mediumGray"
          >
            Terms of service
          </Text>
          .
        </Paragraph>
      </Footer>
    </Container>
  );
}
