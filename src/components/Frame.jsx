import React from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - ${themeGet("space.3")} * 2);
  height: ${themeGet("headerHeight")};
  border-bottom: 0.1rem solid ${themeGet("colors.lightGray")};
  padding: 0 ${themeGet("space.3")};
`;

const Slug = styled.div`
  height: ${themeGet("headerHeight")};
  width: 100%;
`;

const Footer = styled.footer``;

const Logo = () => <Link to="/">Convo</Link>;

export default function Frame({ children }) {
  return (
    <React.Fragment>
      <Header>
        <Logo />
        <UserMenu />
      </Header>
      <Slug />
      {children}
      <Footer />
    </React.Fragment>
  );
}
