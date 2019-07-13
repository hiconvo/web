import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getSelectedThread, getUser } from "../selectors";
import MemberItemMedium from "./MemberItemMedium";
import { Box, Text, Heading, UnstyledButton, Icon } from "./styles";

const Label = styled.span`
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
  margin-bottom: ${themeGet("space.2")};
`;

const ActionButton = styled(UnstyledButton)`
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  border-radius: ${themeGet("radii.special")};
  background-color: transparent;
  transition: all ease 0.2s;
  color: ${themeGet("colors.gray")};
  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
    color: ${themeGet("colors.bodytext")};
  }
`;

function Action({ iconName, text, onClick, ...rest }) {
  return (
    <Box as="li" display="block" {...rest}>
      <ActionButton
        display="flex"
        flexDirection="row"
        alignItems="center"
        mb={1}
        onClick={onClick}
      >
        <Icon name={iconName} fontSize={4} mr={2} color="inherit" />
        <Text fontSize={3} color="inherit">
          {text}
        </Text>
      </ActionButton>
    </Box>
  );
}

export default function InfoBox() {
  const [thread, user] = useSelectors(getSelectedThread, getUser);

  if (!thread.id) return null;

  const isOwner = user.id === thread.owner.id;

  function handleRemoveMember() {}

  function handleAddMember() {}

  function handleRenameThread() {}

  function handleLeaveThread() {}

  function handleDeleteThread() {}

  return (
    <Box>
      <Box position="fixed" width="28rem">
        <Label>Subject</Label>
        <Heading fontFamily="sans" fontSize={4} mb={4} mt="0">
          {thread.subject}
        </Heading>

        <Label>Members</Label>
        <Box as="ul" mb={4}>
          {thread.users &&
            thread.users.map(member => (
              <MemberItemMedium
                key={member.id}
                member={member}
                onDelete={
                  isOwner && member.id !== user.id && handleRemoveMember
                }
                ml="-0.8rem"
                mb={1}
              />
            ))}
        </Box>

        <Label>Actions</Label>
        <Box as="ul" mb={4}>
          {isOwner && (
            <React.Fragment>
              <Action
                ml="-1.2rem"
                onClick={handleAddMember}
                text="Invite others"
                iconName="group_add"
              />
              <Action
                ml="-1.2rem"
                onClick={handleRenameThread}
                text="Rename"
                iconName="edit"
              />
              <Action
                ml="-1.2rem"
                onClick={handleDeleteThread}
                text="Delete"
                iconName="remove_circle"
              />
            </React.Fragment>
          )}
          {!isOwner && (
            <Action
              ml="-1.2rem"
              onClick={handleLeaveThread}
              text="Leave"
              iconName="clear"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
