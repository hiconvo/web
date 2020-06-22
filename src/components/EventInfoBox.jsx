import React, { useState } from "react";
import { useHistory } from "react-router";
import orderBy from "lodash/orderBy";

import { useSelectors } from "../redux";
import AddUserForm from "./AddUserForm";
import InfoBoxMemberItem from "./InfoBoxMemberItem";
import DeleteEventButton from "./DeleteEventButton";
import LeaveEventButton from "./LeaveEventButton";
import UserOverflowList from "./UserOverflowList";
import MagicLinkButton from "./MagicLinkButton";
import { getUser } from "../selectors";
import { Box, Heading, Text } from "./styles";
import { Label, Action } from "./styles/InfoBox";

export default function EventInfoBox({ event }) {
  const history = useHistory();
  const [user] = useSelectors(getUser);
  const [isGuestEditing, setIsGuestEditing] = useState(false);
  const { id, owner } = event;
  const hosts = [owner].concat(event.hosts);
  const isOwner = user.id === owner.id;
  const isHost = hosts.some((v) => v.id === user.id);

  return (
    <React.Fragment>
      <Label>Name</Label>
      <Heading fontFamily="sans" fontSize={4} mb={4} mt="0">
        {event.name}
      </Heading>

      <Label>{hosts.length > 1 ? "Hosts" : "Host"}</Label>
      <Box as="ul" mb={4}>
        {hosts.map((user) => (
          <InfoBoxMemberItem
            key={user.id}
            member={user}
            event={event}
            ml="-0.8rem"
            mb={1}
          />
        ))}
      </Box>

      <Label>Guests</Label>
      <UserOverflowList
        users={
          event.users &&
          orderBy(
            event.users.filter(
              (guest) => !hosts.some((h) => h.id === guest.id)
            ),
            [
              (u) => event.rsvps && event.rsvps.some((rsvp) => rsvp.id === u.id)
            ],
            ["desc"]
          )
        }
        transformUserProps={(props) => ({
          ...props,
          event,
          canDelete: isOwner,
          isChecked:
            event.rsvps && event.rsvps.some((rsvp) => rsvp.id === props.user.id)
        })}
        renderExtraChildren={() => (
          <React.Fragment>
            {isGuestEditing && (
              <AddUserForm
                resourceType={event.resourceType}
                resource={event}
                onBlur={() => setIsGuestEditing(false)}
              />
            )}
            {event.users.length <= 1 && (
              <Text color="gray">No one is here yet</Text>
            )}
          </React.Fragment>
        )}
      />

      <Label>Actions</Label>
      <Box as="ul" mb={4}>
        {(isOwner || event.guestsCanInvite) && (
          <Action
            onClick={() => setIsGuestEditing(true)}
            ml="-1.2rem"
            text="Invite others"
            iconName="group_add"
          />
        )}

        {isHost && (
          <MagicLinkButton
            event={event}
            user={user}
            render={(onClick) => (
              <Action
                onClick={onClick}
                ml="-1.2rem"
                text="Shareable link"
                iconName="link"
              />
            )}
          />
        )}

        {isOwner && (
          <React.Fragment>
            <Action
              onClick={() => history.push(`/events/${id}/edit`)}
              ml="-1.2rem"
              text="Edit"
              iconName="edit"
            />
            <DeleteEventButton
              event={event}
              render={(onClick) => (
                <Action
                  onClick={onClick}
                  ml="-1.2rem"
                  text="Delete"
                  iconName="remove_circle"
                />
              )}
            />
          </React.Fragment>
        )}

        {!isOwner && (
          <LeaveEventButton
            event={event}
            user={user}
            render={(onClick) => (
              <Action
                onClick={onClick}
                ml="-1.2rem"
                text="Leave"
                iconName="remove_circle"
              />
            )}
          />
        )}
      </Box>
    </React.Fragment>
  );
}
