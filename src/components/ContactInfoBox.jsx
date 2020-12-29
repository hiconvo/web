import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Box, Text, ActionButton, Icon, Avatar } from "../components/styles";
import { useActions, useSelectors } from "../redux";
import * as unboundActions from "../actions/contacts";
import { getContacts, getResourceById, getUser } from "../selectors";
import RemoveUserButton from "./RemoveUserButton";

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

export default function ContactInfoBox({ contact, position = "fixed" }) {
  const { addToContacts, removeFromContacts } = useActions(unboundActions);
  const [contacts] = useSelectors(getContacts);
  const isEvent = useRouteMatch("/events");
  const { id } = useParams();
  const [resource, user] = useSelectors(getResourceById(id), getUser);

  if (!contact) return null;

  const isContact = contacts.some((c) => c.id === contact.id);
  const isSelected = Boolean(contact.id);
  const isRemovable =
    !!resource && resource.owner.id === user.id && contact.id !== user.id;

  return (
    <Box>
      <Box position={position} width="28rem">
        <Box mb={4} mt={2}>
          <Avatar src={contact.avatar} size="10rem" />
          <Text mt={4} fontSize={4} pr={2}>
            {isSelected ? contact.fullName : "No one is selected"}
          </Text>
        </Box>
        {isSelected && (
          <React.Fragment>
            <Label>Actions</Label>
            <Box as="ul">
              {isContact ? (
                <Action
                  ml="-1.2rem"
                  text="Remove from contacts"
                  iconName="remove_circle"
                  onClick={() => removeFromContacts(contact.id)}
                />
              ) : (
                <Action
                  ml="-1.2rem"
                  text="Add to contacts"
                  iconName="person_add"
                  onClick={() => addToContacts(contact.id)}
                />
              )}
            </Box>
            {isRemovable && (
              <RemoveUserButton
                render={(toggleIsOpen) => (
                  <Action
                    ml="-1.2rem"
                    text="Remove"
                    iconName="clear"
                    onClick={toggleIsOpen}
                  />
                )}
                user={contact}
                thread={!isEvent && resource}
                event={isEvent && resource}
              />
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
