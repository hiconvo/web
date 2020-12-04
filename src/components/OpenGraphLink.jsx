import React, { useState } from "react";

import { Box, Paragraph, FixedAspectRatioImage } from "./styles";

export default function OpenGraphLink({ link }) {
  const [favicon, setFavicon] = useState(
    link.favicon.startsWith("https") ? link.favicon : ""
  );
  const image = link.image.startsWith("https") ? link.image : "";

  return (
    // eslint-disable-next-line
    <a href={link.url} target="_blank">
      <Box borderRadius="normal" overflow="hidden">
        {image && <FixedAspectRatioImage src={image} width={16} height={9} />}
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
              <Paragraph mb={0} fontSize={1} width="calc(100% - 1.5rem)">
                {link.site}
              </Paragraph>
            )}
          </Box>
        </Box>
      </Box>
    </a>
  );
}
