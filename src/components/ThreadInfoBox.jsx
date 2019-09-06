import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getSelectedResource, getUser } from "../selectors";
import ThreadInfoBoxMemberItem from "./ThreadInfoBoxMemberItem";
import ThreadRenameForm from "./ThreadRenameForm";
import AddUserToThreadForm from "./AddUserToThreadForm";
import DeleteThreadButton from "./DeleteThreadButton";
import LeaveThreadButton from "./LeaveThreadButton";
import { Box, Text, Heading, ActionButton, Icon } from "./styles";

const Label = styled.span`
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
  margin-bottom: ${themeGet("space.2")};
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

export default function InfoBox({ position = "fixed" }) {
  const [thread, user] = useSelectors(getSelectedResource, getUser);
  const [isRenameEditing, setIsRenameEditing] = useState(false);
  const [isMemberEditing, setIsMemberEditing] = useState(false);

  if (!thread.id) return <div />;

  const isOwner = user.id === thread.owner.id;

  return (
    <Box>
      <Box position={position} width="28rem">
        {isRenameEditing ? (
          <ThreadRenameForm
            thread={thread}
            onBlur={() => setIsRenameEditing(false)}
          />
        ) : (
          <React.Fragment>
            <Label>Subject</Label>
            <Heading fontFamily="sans" fontSize={4} mb={4} mt="0">
              {thread.subject}
            </Heading>
          </React.Fragment>
        )}

        <Label>Members</Label>
        <Box as="ul" mb={4}>
          {thread.users &&
            thread.users.map(member => (
              <ThreadInfoBoxMemberItem
                key={member.id}
                member={member}
                thread={thread}
                canDelete={isOwner && member.id !== user.id}
                ml="-0.8rem"
                mb={1}
              />
            ))}
          {isMemberEditing && (
            <AddUserToThreadForm
              thread={thread}
              onBlur={() => setIsMemberEditing(false)}
            />
          )}
        </Box>

        <Label>Actions</Label>
        <Box as="ul" mb={4}>
          {isOwner && (
            <React.Fragment>
              <Action
                ml="-1.2rem"
                onClick={() => setIsMemberEditing(true)}
                text="Invite others"
                iconName="group_add"
              />
              <Action
                ml="-1.2rem"
                onClick={() => setIsRenameEditing(true)}
                text="Rename"
                iconName="edit"
              />
              <DeleteThreadButton
                thread={thread}
                render={onClick => (
                  <Action
                    ml="-1.2rem"
                    onClick={onClick}
                    text="Delete"
                    iconName="remove_circle"
                  />
                )}
              />
            </React.Fragment>
          )}
          {!isOwner && (
            <LeaveThreadButton
              thread={thread}
              user={user}
              render={onClick => (
                <Action
                  ml="-1.2rem"
                  onClick={onClick}
                  text="Leave"
                  iconName="clear"
                />
              )}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
