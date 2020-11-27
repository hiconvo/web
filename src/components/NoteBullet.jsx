import React from "react";

import { Box } from "../components/styles";

export default function Bullet({ favicon, isLink }) {
  return (
    <Box
      height="2rem"
      width="2rem"
      justifyContent="center"
      alignItems="center"
      flexShrink="0"
      mr={2}
    >
      {favicon ? (
        <Box as="img" height="100%" width="100%" src={favicon} />
      ) : (
        <Box
          dangerouslySetInnerHTML={{ __html: isLink ? "&#x1F30F" : "&#x1F4DD" }}
        />
      )}
    </Box>
  );
}
