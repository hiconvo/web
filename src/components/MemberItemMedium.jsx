import React from "react";
import styled from "styled-components";
import { margin } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

import { Text, Icon } from "./styles";

const DeleteButton = styled.button`
  background: inherit;
  border: none;
  visibility: hidden;
`;

const Container = styled.li`
  ${margin}
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

    ${DeleteButton} {
      visibility: visible;
    }
  }
`;

const Avatar = styled.div`
  border-radius: 100%;
  background-color: ${themeGet("colors.lightGray")};
  height: 3rem;
  width: 3rem;
`;

export default function MemberItemMedium({ member, onDelete, ...rest }) {
  return (
    <Container {...rest}>
      <Avatar src={member.avatar} />
      <Text ml={2} fontSize={3}>
        {member.fullName}
      </Text>
      {onDelete && (
        <DeleteButton onClick={onDelete}>
          <Icon name="clear" fontSize={4} display="flex" />
        </DeleteButton>
      )}
    </Container>
  );
}
