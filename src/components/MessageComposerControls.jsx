import React from "react";

import { Box, Text, Button, Icon } from "./styles";

export default function ComposerControls({ value, onClick, isDisabled }) {
  const wordCount = value
    .getCurrentContent()
    .getPlainText()
    .trim()
    .split(/\s+/).length;
  const estimate = (wordCount / 300).toFixed(1);
  const min = estimate === (1).toFixed(1) ? "minute" : "minutes";
  return (
    <Box justifyContent="space-between" alignItems="center" flexDirection="row">
      <Text
        fontFamily="sans"
        fontSize={0}
        color="lightGray"
        display="inline-block"
      >
        About {estimate} {min} to read
      </Text>
      <Button
        onClick={onClick}
        variant="brand"
        color="primary700"
        width="8rem"
        fontSize={2}
        mb="0"
        pr="0"
        disabled={isDisabled}
        isLoading={isDisabled}
      >
        Send <Icon name="send" ml={1} fontSize="2.0rem" />
      </Button>
    </Box>
  );
}
