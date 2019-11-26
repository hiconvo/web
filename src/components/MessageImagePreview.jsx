import React from "react";

import { Box, theme } from "./styles";

export default function MessageImagePreview({ src, onClick }) {
  if (src.length) {
    return (
      <Box borderTop="dashed" pt="1.6rem" mb={1} height="12rem">
        <div>
          <img
            src={src}
            alt="upload"
            style={{
              display: "block !important",
              height: "10.4rem",
              float: "left",
              borderRadius: theme.radii.normal
            }}
          />
        </div>
      </Box>
    );
  }

  return <Box />;
}
