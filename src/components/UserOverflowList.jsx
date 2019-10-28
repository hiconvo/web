import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import UserOverflowModal from "./UserOverflowModal";
import { Text, Box, Icon, UnstyledButton } from "./styles";

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
          {...transformUserProps({
            user,
            member: user,
            key: user.id,
            ml: "-0.8rem"
          })}
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
          <UserOverflowModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            users={users}
            transformUserProps={transformUserProps}
          />
        </Box>
      )}
      {renderExtraChildren()}
    </Box>
  );
}
