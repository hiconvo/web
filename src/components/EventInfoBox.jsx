import React, { useState } from "react";

import AddUserForm from "./AddUserForm";
import InfoBoxMemberItem from "./InfoBoxMemberItem";
import DeleteEventButton from "./DeleteEventButton";
import { Box, Heading } from "./styles";
import { Label, Action } from "./styles/InfoBox";

export default function EventInfoBox({ event, user }) {
  const [isGuestEditing, setIsGuestEditing] = useState(false);
  const { owner } = event;
  const isOwner = user.id === owner.id;

  return (
    <React.Fragment>
      <Label>Name</Label>
      <Heading fontFamily="sans" fontSize={4} mb={4} mt="0">
        {event.name}
      </Heading>

      <Label>Host</Label>
      <Box as="ul" mb={4}>
        <InfoBoxMemberItem member={owner} event={event} ml="-0.8rem" mb={1} />
      </Box>

      <Label>Guests</Label>
      <Box as="ul" mb={4}>
        {event.users &&
          event.users
            .filter(guest => guest.id !== owner.id)
            .map(guest => (
              <InfoBoxMemberItem
                key={guest.id}
                member={guest}
                event={event}
                canDelete={isOwner}
                ml="-0.8rem"
                mb={1}
              />
            ))}
        {isGuestEditing && (
          <AddUserForm
            resourceType={event.resourceType}
            resource={event}
            onBlur={() => setIsGuestEditing(false)}
          />
        )}
      </Box>

      {isOwner && (
        <React.Fragment>
          <Label>Actions</Label>
          <Box as="ul" mb={4}>
            <React.Fragment>
              <Action
                onClick={() => setIsGuestEditing(true)}
                ml="-1.2rem"
                text="Invite others"
                iconName="group_add"
              />
              <Action ml="-1.2rem" text="Edit" iconName="edit" />
              <DeleteEventButton
                event={event}
                render={onClick => (
                  <Action
                    onClick={onClick}
                    ml="-1.2rem"
                    text="Delete"
                    iconName="remove_circle"
                  />
                )}
              />
            </React.Fragment>
          </Box>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
