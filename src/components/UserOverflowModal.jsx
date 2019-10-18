import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Modal from "styled-react-modal";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import { Box, Icon, Heading, UnstyledButton } from "./styles";

const StyledModal = Modal.styled`
  max-width: 95vw;
  max-height: 95vh;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.normal")};
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
  function handleClick(e) {
    e.stopPropagation();
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
              onClickOverride={handleClick}
              {...transformUserProps({
                user,
                member: user,
                key: user.id
              })}
            />
          ))}
        </List>
      </Box>
    </StyledModal>
  );
}
