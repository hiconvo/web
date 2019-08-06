import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Text, Icon, Avatar } from "./styles";

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${themeGet("radii.normal")};
  padding: ${themeGet("space.2")};
  background-color: ${themeGet("colors.veryLightGray")};
  margin: ${themeGet("space.1")};
`;

const DeleteButton = styled.button`
  background: inherit;
  border: none;
`;

export default function MemberItemSmallInline({ member, onDelete }) {
  return (
    <Container>
      <Avatar src={member.avatar} size="2rem" />
      <Text ml={2}>{member.fullName}</Text>
      {onDelete && (
        <DeleteButton onClick={onDelete}>
          <Icon name="clear" fontSize="1.8rem" display="flex" />
        </DeleteButton>
      )}
    </Container>
  );
}
