import React, { useState } from "react";
import { useHistory } from "react-router";

import AddUserForm from "./AddUserForm";
import InfoBoxMemberItem from "./InfoBoxMemberItem";
import DeleteEventButton from "./DeleteEventButton";
import UserOverflowList from "./UserOverflowList";
import { Box, Heading } from "./styles";
import { Label, Action } from "./styles/InfoBox";

export default function EventInfoBox({ event, user }) {
  const history = useHistory();
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
      <UserOverflowList
        users={
          event.users && event.users.filter(guest => guest.id !== owner.id)
        }
        transformUserProps={props => ({
          ...props,
          event,
          canDelete: isOwner,
          isChecked:
            event.rsvps && event.rsvps.some(rsvp => rsvp.id === props.user.id)
        })}
        renderExtraChildren={() =>
          isGuestEditing && (
            <AddUserForm
              resourceType={event.resourceType}
              resource={event}
              onBlur={() => setIsGuestEditing(false)}
            />
          )
        }
      />

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
              <Action
                onClick={() => history.push("/events/edit")}
                ml="-1.2rem"
                text="Edit"
                iconName="edit"
              />
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
