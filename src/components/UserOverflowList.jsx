import React from "react";

import { Box } from "./styles";

export default function UserOverflowList({
  users,
  renderItem,
  renderExtraChildren
}) {
  return (
    <Box as="ul" mb={4} maxHeight="30rem">
      {users && users.map(renderItem)}
      {renderExtraChildren()}
    </Box>
  );
}
