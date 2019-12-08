import React from "react";

import { Box, Icon, theme } from "./styles";

export default function MessageImagePreview({ src, onClick }) {
  if (src.length) {
    return (
      <Box borderTop="dashed" pt="1.2rem" mt="0.2rem" mb={1} height="12rem">
        <div style={{ position: "relative", width: "fit-content" }}>
          <Box
            position="absolute"
            top={1}
            right={1}
            backgroundColor="white"
            borderRadius="100%"
          >
            <Icon onClick={onClick} name="close" fontSize={4} />
          </Box>
          <img
            src={src}
            alt="upload"
            style={{
              display: "block !important",
              height: "10.4rem",
              maxWidth: "100%",
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
