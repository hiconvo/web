import React from "react";
import { Box, Text, Paragraph, Avatar } from "./styles";

export default function ContactSection({ user, users }) {
  return (
    <Box flexDirection="row" alignItems="center" mb={3}>
      <Box mr={2}>
        <Avatar size="4.8rem" src={user && user.avatar} />
      </Box>
      <Box>
        <Paragraph lineHeight="1em" mb={1}>
          <Text fontWeight="semiBold" lineHeight="1em">
            {user && user.fullName}
          </Text>
        </Paragraph>
        <Paragraph mb={0} lineHeight="1em">
          <Text fontSize={1} color="gray" lineHeight="1em">
            Shared with {users && users.map(u => u.fullName).join(", ")}
          </Text>
        </Paragraph>
      </Box>
    </Box>
  );
}
