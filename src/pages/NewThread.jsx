import React from "react";

import ThreadComposer from "../components/ThreadComposer";
import { Box, FloatingPill } from "../components/styles";

export default function NewThread() {
  return (
    <Box maxWidth="70rem" mx="auto">
      <FloatingPill>
        <ThreadComposer />
      </FloatingPill>
    </Box>
  );
}
