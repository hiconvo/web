import React from "react";
import { Box, Text, Paragraph, Avatar } from "./styles";

function getTruncatedUserList(owner, users) {
  const list = users && users.filter(u => u.id !== owner.id);

  if (list.length > 0) {
    if (list.length === 1) {
      return list[0].fullName;
    } else if (list.length === 2) {
      return `${list[0].fullName} and ${list[1].fullName}`;
    } else if (list.length === 3) {
      return `${list[0].fullName}, ${list[1].fullName}, and ${list.length -
        2} other`;
    } else if (list.length > 3) {
      return `${list[0].fullName}, ${list[1].fullName}, and ${list.length -
        2} others`;
    } else {
      return `${list[0].fullName} and ${list.length - 1} others`;
    }
  }

  return "yourself";
}

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
            Shared with {getTruncatedUserList(user, users)}
          </Text>
        </Paragraph>
      </Box>
    </Box>
  );
}
