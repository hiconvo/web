import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${themeGet("headerHeight")};
  border-bottom: 0.1rem solid ${themeGet("colors.lightGray")};
  padding: 0 ${themeGet("space.3")};
`;

const Slug = styled.div`
  height: ${themeGet("headerHeight")};
  width: 100%;
`;

const Footer = styled.footer``;

export default function Frame({ children }) {
  return (
    <React.Fragment>
      <Header>Convo</Header>
      <Slug />
      {children}
      <Footer />
    </React.Fragment>
  );
}
