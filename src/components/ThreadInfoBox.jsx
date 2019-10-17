import React, { useState } from "react";

import InfoBoxMemberItem from "./InfoBoxMemberItem";
import ThreadRenameForm from "./ThreadRenameForm";
import AddUserForm from "./AddUserForm";
import DeleteThreadButton from "./DeleteThreadButton";
import LeaveThreadButton from "./LeaveThreadButton";
import UserOverflowList from "./UserOverflowList";
import { Box, Heading } from "./styles";
import { Label, Action } from "./styles/InfoBox";

export default function ThreadInfoBox({ thread, user }) {
  const [isRenameEditing, setIsRenameEditing] = useState(false);
  const [isMemberEditing, setIsMemberEditing] = useState(false);

  if (!thread.id) return <div />;

  const isOwner = user.id === thread.owner.id;

  return (
    <React.Fragment>
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
      <UserOverflowList
        users={thread.users}
        transformUserProps={props => ({
          ...props,
          thread,
          canDelete: isOwner && props.user.id !== user.id
        })}
        renderExtraChildren={() =>
          isMemberEditing && (
            <AddUserForm
              resourceType={thread.resourceType}
              resource={thread}
              onBlur={() => setIsMemberEditing(false)}
            />
          )
        }
      />

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
    </React.Fragment>
  );
}
