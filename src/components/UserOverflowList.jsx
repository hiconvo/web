import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import UserOverflowModal from "./UserOverflowModal";
import { Text, Box, Icon, Button } from "./styles";

const Container = styled(Button)`
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: ${themeGet("radii.special")};
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  background-color: transparent;
  transition: background-color ease ${themeGet("animations.fast")};
  margin-left: -0.8rem;

  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
    visibility: visible;
  }
`;

const MAX_LENGTH = 4;

export default function UserOverflowList({
  maxLength = MAX_LENGTH,
  users = [],
  transformUserProps = (p) => p,
  renderExtraChildren = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Box as="ul" mb={4}>
      {users.slice(0, maxLength).map((user) => (
        <InfoBoxMemberItem
          {...transformUserProps({
            user,
            member: user,
            key: user.id,
            ml: "-0.8rem"
          })}
        />
      ))}
      {users.length > maxLength && (
        <Box>
          <Container onClick={toggleModal}>
            <Box alignItems="center" flexDirection="row">
              <Icon name="more_horiz" width="3rem" fontSize={3} color="gray" />
              <Text ml={2} fontSize={3} color="gray">
                See {users.length - maxLength} more
              </Text>
            </Box>
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
