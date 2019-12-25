import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Modal from "styled-react-modal";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import ContactCard from "./ContactCard";
import ContactInfoBox from "./ContactInfoBox";
import { Box, Icon, UnstyledButton, theme } from "./styles";

const StyledModal = Modal.styled`
  max-width: 90rem;
  max-height: 85vh;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.normal")};

  ${themeGet("media.phone")} {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: unset;
  }
`;

const ContactModal = Modal.styled`
  padding: ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  position: relative;
`;

const List = styled.ul`
  max-height: 85vh;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;

  ${themeGet("media.phone")} {
    flex-wrap: unset;
    display: block;
    max-height: 95vh;
  }
`;

function UserTile({ isMobile, onClickOverride, ...rest }) {
  if (isMobile) {
    return <InfoBoxMemberItem onClickOverride={onClickOverride} {...rest} />;
  } else {
    return (
      <Box width="25%" overflow="hidden">
        <ContactCard onClick={onClickOverride} {...rest} />
      </Box>
    );
  }
}

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
        e && e.stopPropagation();

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
      <Box p={[3, 4]} maxHeight={["100vh", "85vh"]}>
        <Box
          justifyContent="flex-end"
          alignItems="center"
          flexDirection="row"
          mb={3}
        >
          <UnstyledButton onClick={toggleModal}>
            <Icon name="close" fontSize={4} />
          </UnstyledButton>
        </Box>
        <List>
          {users.map(user => (
            <UserTile
              isMobile={mql.matches}
              onClickOverride={generateClickHandler(user)}
              {...transformUserProps({
                user,
                contact: user,
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
