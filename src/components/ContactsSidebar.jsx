import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Box, Text, ActionButton, Icon, Avatar } from "../components/styles";
import { useActions } from "../redux";
import * as unboundActions from "../actions/contacts";

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

export default function ContactsSidebar({ selectedContact, isContact }) {
  const { addToContacts, removeFromContacts } = useActions(unboundActions);
  const isSelectedContact = Boolean(selectedContact.id);

  return (
    <Box>
      <Box alignItems="center" mb={4} mt={2}>
        <Avatar src={selectedContact.avatar} size="10rem" />
        <Text mt={4} fontSize={4} px={2} textAlign="center">
          {isSelectedContact ? selectedContact.fullName : "No one is selected"}
        </Text>
      </Box>
      {isSelectedContact && (
        <React.Fragment>
          <Label>Actions</Label>
          <Box as="ul" mb={4}>
            {isContact ? (
              <Action
                ml="-1.2rem"
                text="Remove from contacts"
                iconName="remove_circle"
                onClick={() => removeFromContacts(selectedContact.id)}
              />
            ) : (
              <Action
                ml="-1.2rem"
                text="Add to contacts"
                iconName="person_add"
                onClick={() => addToContacts(selectedContact.id)}
              />
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
