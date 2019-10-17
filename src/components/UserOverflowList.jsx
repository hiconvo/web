import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Modal from "styled-react-modal";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import { Text, Box, Icon, Heading, UnstyledButton } from "./styles";

const Container = styled.li`
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: ${themeGet("radii.special")};
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  background-color: transparent;
  transition: background-color ease ${themeGet("animations.fast")};

  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
    visibility: visible;
  }
`;

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

const MAX_LENGTH = 4;

export default function UserOverflowList({
  users = [],
  transformUserProps = p => p,
  renderExtraChildren
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Box as="ul" mb={4}>
      {users.slice(0, MAX_LENGTH).map(user => (
        <InfoBoxMemberItem
          {...transformUserProps({ user, member: user, key: user.id })}
        />
      ))}
      {users.length > MAX_LENGTH && (
        <Box>
          <Container>
            <UnstyledButton p={0} onClick={toggleModal}>
              <Box alignItems="center" flexDirection="row">
                <Icon
                  name="more_horiz"
                  width="3rem"
                  fontSize={3}
                  color="gray"
                />
                <Text ml={2} fontSize={3} color="gray">
                  See {users.length - MAX_LENGTH} more
                </Text>
              </Box>
            </UnstyledButton>
          </Container>
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
                    onClickOverride={() => {}}
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
        </Box>
      )}
      {renderExtraChildren()}
    </Box>
  );
}
