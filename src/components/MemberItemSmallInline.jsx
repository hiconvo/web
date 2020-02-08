import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Text, Icon, Avatar, Box } from "./styles";

const Container = styled(Box)``;

Container.defaultProps = {
  as: "li",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  p: 2,
  backgroundColor: "veryLightGray",
  m: 1,
  borderRadius: "normal"
};

const DeleteButton = styled.div`
  background: inherit;
  border: none;
  margin-left: ${themeGet("space.1")};
`;

export default function MemberItemSmallInline({ member, onDelete, ...rest }) {
  return (
    <Container {...rest}>
      <Avatar src={member.avatar} size="2rem" />
      <Text
        ml={2}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {member.fullName || "Unregistered"}
      </Text>
      {onDelete && (
        <DeleteButton role="button" onClick={onDelete}>
          <Icon name="clear" fontSize="1.8rem" display="flex" />
        </DeleteButton>
      )}
    </Container>
  );
}
