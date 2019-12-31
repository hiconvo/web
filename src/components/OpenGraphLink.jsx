import React from "react";

import { Box, Paragraph } from "./styles";

export default function OpenGraphLink({ link }) {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <Box borderRadius="normal" overflow="hidden">
        <Box as="img" display="block" width="100%" src={link.image} />
        <Box backgroundColor="lightGray" p={3}>
          <Box mb={1}>
            <Paragraph fontSize={1} fontWeight="bold" mb={1}>
              {link.title}
            </Paragraph>
            <Paragraph fontSize={0} mb={0}>
              {link.description}
            </Paragraph>
          </Box>
          <Box flexDirection="row" alignItems="center">
            {link.favicon && (
              <Box
                as="img"
                src={link.favicon}
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
