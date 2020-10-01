import React from "react";

import { Text, Icon, Button } from ".";

export default function IconButton({ iconName, text, ...rest }) {
  return (
    <Button variant="action" {...rest}>
      <Icon name={iconName} mr={2} color="inherit" />
      <Text fontWeight="inherit" color="inherit" fontSize="inherit">
        {text}
      </Text>
    </Button>
  );
}
