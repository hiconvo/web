import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getSelectedThread } from "../selectors";
import { Box, Text, Heading } from "./styles";

const Label = styled.span`
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
  margin-bottom: ${themeGet("space.2")};
`;

export default function InfoBox() {
  const [thread] = useSelectors(getSelectedThread);

  if (!thread.id) return null;

  return (
    <Box>
      <Box position="fixed" zIndex="-1">
        <Label>Subject</Label>
        <Heading fontFamily="sans" fontSize={4} mb={4} mt="0">
          {thread.subject}
        </Heading>

        <Label>Members</Label>
        <Box as="ul" mb={4}>
          {thread.users &&
            thread.users.map(user => (
              <Text as="li" fontFamily="sans" fontSize={3} mb={2}>
                {user.fullName}
              </Text>
            ))}
        </Box>

        <Label>Actions</Label>
        <Box as="ul" mb={4}>
          <Text as="li" fontSize={2} color="mediumGray" mb={2}>
            Leave
          </Text>
          <Text as="li" fontSize={2} color="mediumGray" mb={2}>
            Block
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
