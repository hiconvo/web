import React, { useState } from "react";

import { Box, Paragraph } from "./styles";

export default function OpenGraphLink({ link }) {
  const [favicon, setFavicon] = useState(
    link.favicon.startsWith("https") ? link.favicon : ""
  );
  const image = link.image.startsWith("https") ? link.image : "";

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <Box borderRadius="normal" overflow="hidden">
        {image && <Box as="img" display="block" width="100%" src={image} />}
        <Box backgroundColor="veryLightGray" p={3}>
          <Box mb={1}>
            <Paragraph fontSize={1} fontWeight="bold" mb={1}>
              {link.title}
            </Paragraph>
            <Paragraph fontSize={0} mb={0}>
              {link.description}
            </Paragraph>
          </Box>
          <Box flexDirection="row" alignItems="center">
            {favicon && (
              <Box
                as="img"
                src={favicon}
                onError={() => setFavicon("")}
                height="1.5rem"
                width="1.5rem"
                mr={2}
              />
            )}
            {link.site && (
              <Paragraph mb={0} fontSize={1}>
                {link.site}
              </Paragraph>
            )}
          </Box>
        </Box>
      </Box>
    </a>
  );
}
