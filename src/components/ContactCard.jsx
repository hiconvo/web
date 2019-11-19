import React, { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import {
  Box,
  Avatar,
  Text,
  Icon,
  UnstyledButton,
  theme
} from "../components/styles";
import ContactInfoBox from "./ContactInfoBox";

const StyledModal = Modal.styled`
  padding: ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100vw - ${themeGet("space.4")} * 2);
  height: 100vh;
  justify-content: center;
`;

const CloseButtonContainer = styled.div`
  display: block;
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 40;
`;

export default function ContactCard({
  contact,
  isChecked,
  isCheckedCopy = "Going",
  onClick
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    onClick && onClick();

    const mql = window.matchMedia(`(max-width: ${theme.breakpoints[0]})`);
    if (mql.matches) {
      setIsOpen(true);
    }
  }

  return (
    <React.Fragment>
      <UnstyledButton onClick={handleClick}>
        <Box justifyContent="center" alignItems="center" px={2} py={4}>
          <Avatar src={contact.avatar} size="7rem" />
          <Text mt={3} px={2} fontSize={3} textAlign="center">
            {contact.fullName}
          </Text>
          {isChecked && (
            <Box flexDirection="row" alignItems="center" mt={2}>
              <Icon name="check" fontSize={4} display="flex" ml={2} />
              <Text>{isCheckedCopy}</Text>
            </Box>
          )}
        </Box>
      </UnstyledButton>
      <StyledModal isOpen={isOpen}>
        <CloseButtonContainer>
          <Icon onClick={() => setIsOpen(false)} name="close" fontSize={5} />
        </CloseButtonContainer>
        <ContactInfoBox position="static" contact={contact} />
      </StyledModal>
    </React.Fragment>
  );
}
