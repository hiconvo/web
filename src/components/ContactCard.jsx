import React from "react";

import { Box, Avatar, Text, UnstyledButton } from "../components/styles";

export default function ContactCard({ contact, onClick }) {
  return (
    <UnstyledButton onClick={onClick}>
      <Box justifyContent="center" alignItems="center" px={2} py={4}>
        <Avatar src={contact.avatar} size="7rem" />
        <Text mt={3} px={2} fontSize={3} textAlign="center">
          {contact.fullName}
        </Text>
      </Box>
    </UnstyledButton>
  );
}
