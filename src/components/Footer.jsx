import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Link } from "react-router-dom";

import { Paragraph, Text } from "./styles";

const Container = styled.footer`
  height: ${themeGet("footerHeight")};
`;

export default function Footer() {
  return (
    <Container>
      <Paragraph fontSize={0} color="mediumGray" textAlign="center">
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <Link to="/convos/new?userId=Eg8KBFVzZXIQgICAuI6DhQo">
          Alexander Richey
        </Link>{" "}
        in Seattle, WA.
        <br />
        Copyright &copy; {new Date().getFullYear()} Convo LLC. All rights
        reserved.{" "}
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
    </Container>
  );
}
