import React from "react";

import { Text, Icon, Button } from ".";

export default function IconButton({
  iconName,
  text,
  mobileHideText,
  ...rest
}) {
  return (
    <Button variant="action" title={text} {...rest}>
      <Icon name={iconName} color="inherit" />
      <Text
        ml={2}
        fontWeight="inherit"
        color="inherit"
        fontSize="inherit"
        display={mobileHideText ? ["none", "inline"] : "inline"}
      >
        {text}
      </Text>
    </Button>
  );
}
