import React, { useState, useCallback, useEffect } from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { themeGet } from "@styled-system/theme-get";
import { motion } from "framer-motion";

import InboxList from "./InboxList";
import { Icon, LinkButton, Box } from "./styles";
import Logo from "./Logo";
import { useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";

const Container = styled.div`
  display: none;

  ${themeGet("media.phone")} {
    display: flex;
  }
`;

const StyledModal = Modal.styled`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  width: calc(100vw - 2rem);
  max-width: ${themeGet("sidebarWidth")};
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${themeGet("colors.trueWhite")};
  transition: opacity ease ${themeGet("animations.fast")};
  backface-visibility: hidden;
  perspective: 1000;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${themeGet("space.2")};
  border-bottom: 0.1rem solid ${themeGet("colors.veryLightGray")};
`;

export default function MobileLogoMenu() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, handleClick]);

  const ani = {
    open: { opacity: 1, x: 0, transition: { x: { stiffness: 1000 } } },
    closed: { opacity: 0, x: -50 }
  };

  return (
    <Container>
      <Icon
        onClick={() => isLoggedIn && setIsOpen(!isOpen)}
        name="menu"
        fontSize={7}
        color="primary"
      />
      <StyledModal isOpen={isOpen} onBackgroundClick={() => setIsOpen(false)}>
        <motion.div
          variants={ani}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
        >
          <Nav>
            <Box width="7rem" p={3}>
              <Logo height="6rem" />
            </Box>
            {!pathname.endsWith("convos") ? (
              <LinkButton to="/convos" justifyContent="flex-start" mb="0">
                Convos
              </LinkButton>
            ) : (
              <LinkButton to="/contacts" justifyContent="flex-start" mb="0">
                Contacts
              </LinkButton>
            )}
          </Nav>
          <Nav>
            <LinkButton
              to="/convos/new"
              variant="brand"
              width="100%"
              alignItems="center"
              justifyContent="flexStart"
              display="flex"
              mb="0"
              fontSize={[1]}
            >
              <Icon name="mail_outline" mr={1} fontSize="2.2rem" />
              New Convo
            </LinkButton>
            <LinkButton
              to="/events/new"
              variant="brand"
              width="100%"
              alignItems="center"
              justifyContent="flexStart"
              display="flex"
              mb="0"
              fontSize={[1]}
            >
              <Icon name="event" mr={1} fontSize="2.2rem" />
              New Event
            </LinkButton>
          </Nav>
          <InboxList />
        </motion.div>
      </StyledModal>
    </Container>
  );
}
