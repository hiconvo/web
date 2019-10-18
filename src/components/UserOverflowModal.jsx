import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Modal from "styled-react-modal";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import ContactInfoBox from "./ContactInfoBox";
import { Box, Icon, Heading, UnstyledButton, theme } from "./styles";

const StyledModal = Modal.styled`
  max-width: 95vw;
  max-height: 95vh;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.normal")};
`;

const ContactModal = Modal.styled`
  padding: ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  position: relative;
`;

const List = styled.ul`
  max-height: 95vh;
  overflow-y: scroll;
`;

export default function UserOverflowModal({
  isOpen,
  toggleModal,
  users,
  transformUserProps = p => p
}) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const mql = window.matchMedia(`(max-width: ${theme.breakpoints[0]})`);

  function generateClickHandler(user) {
    let handleClick;
    // If we're on mobile, show the default user screen take over.
    // If we're on desktop, show the nested modal.
    if (mql.matches) {
      handleClick = null;
    } else {
      handleClick = e => {
        e.stopPropagation();

        setSelectedContact(user);
        setIsContactModalOpen(true);
      };
    }

    return handleClick;
  }

  function handleClose() {
    setIsContactModalOpen(false);
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onEscapeKeydown={toggleModal}
      onBackgroundClick={toggleModal}
    >
      <Box p={[3, 4]} maxHeight="95vh">
        <Box
          justifyContent="space-between"
          alignItems="center"
          flexDirection="row"
          mb={3}
        >
          <Heading as="h3" fontSize={3} fontWeight="semiBold" mb="0rem">
            Guests
          </Heading>
          <UnstyledButton onClick={toggleModal}>
            <Icon name="close" fontSize={4} />
          </UnstyledButton>
        </Box>
        <List>
          {users.map(user => (
            <InfoBoxMemberItem
              onClickOverride={generateClickHandler(user)}
              {...transformUserProps({
                user,
                member: user,
                key: user.id
              })}
            />
          ))}
        </List>
        <ContactModal
          isOpen={isContactModalOpen}
          onBackgroundClick={handleClose}
          onEscapeKeydown={handleClose}
        >
          <Box position="absolute" top="0" right="0" p={3}>
            <Icon onClick={handleClose} name="close" fontSize={5} />
          </Box>
          <ContactInfoBox position="static" contact={selectedContact} />
        </ContactModal>
      </Box>
    </StyledModal>
  );
}
