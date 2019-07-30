import React, { useState, useCallback, useEffect } from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import ThreadList from "./ThreadList";
import { Icon, LinkButton } from "./styles";
import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";

const Container = styled.div`
  display: none;

  ${themeGet("media.phone")} {
    display: flex;
  }
`;

const StyledModal = Modal.styled`
  height: 100vh;
  width: calc(100vw - 2rem);
  max-width: ${themeGet("sidebarWidth")};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${themeGet("colors.trueWhite")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateX(0rem)" : "translateX(-10rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
`;

export default function MobileLogoMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  const afterOpen = () => setTimeout(() => setIsVisible(true));
  const beforeClose = () =>
    new Promise(resolve => {
      setIsVisible(false);
      setTimeout(resolve, 200);
    });
  const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, handleClick]);

  return (
    <Container>
      <Icon
        onClick={() => isLoggedIn && setIsOpen(!isOpen)}
        name="menu"
        fontSize={7}
        color="primary"
      />
      <StyledModal
        isOpen={isOpen}
        isVisible={isVisible}
        onBackgroundClick={() => setIsOpen(false)}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
      >
        <LinkButton
          to="/convos/new"
          variant="brand"
          width="100%"
          alignItems="center"
          display="flex"
          mb="0"
          fontSize={[1]}
        >
          New Convo <Icon name="mail_outline" ml={1} fontSize="2.2rem" />
        </LinkButton>
        <ThreadList />
      </StyledModal>
    </Container>
  );
}
