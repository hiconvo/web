import React from "react";

import {
  Box,
  FloatingPill,
  Heading,
  Paragraph,
  LinkButton,
  Text,
  FixedAspectRatioImage
} from "../components/styles";

export default function LinksNullState() {
  return (
    <Box maxWidth="80rem" width="100%" margin="auto">
      <FloatingPill>
        <Box mb={4}>
          <Heading fontSize={5} fontWeight="bold">
            Save links as you browse
          </Heading>

          <Paragraph fontSize={3} maxWidth="60rem">
            Download the browser extension to save links, take notes, and tag,
            search, and filter items.
          </Paragraph>

          <Box mt={3} mb={3} maxWidth="70rem">
            <FixedAspectRatioImage
              src="/screenshots/links-hero.png"
              width={700}
              height={374}
            />
          </Box>

          <Box
            flexDirection={["column", "row"]}
            width="100%"
            mt={4}
            pt={3}
            borderTop="dashed"
          >
            <Box width={["100%", "33%"]} alignItems="center">
              <Box
                as="img"
                width="100%"
                maxWidth="16rem"
                src="/browsers/firefox.jpg"
              />
              <LinkButton
                variant="secondary"
                to="https://addons.mozilla.org/en-US/firefox/addon/convo/"
              >
                Firefox
              </LinkButton>
            </Box>
            <Box width={["100%", "33%"]} alignItems="center">
              <Box
                as="img"
                width="100%"
                maxWidth="16rem"
                src="/browsers/chrome-brave.jpg"
              />
              <LinkButton
                variant="secondary"
                to="https://chrome.google.com/webstore/detail/convo/oneifhdbldlgdldmihfgmpiknhghcble"
              >
                Chrome and Brave
              </LinkButton>
            </Box>
            <Box width={["100%", "33%"]} alignItems="center">
              <Box
                as="img"
                width="100%"
                maxWidth="16rem"
                src="/browsers/safari.jpg"
              />
              <LinkButton variant="secondary" to="#" disabled>
                <Text fontSize="inherit" color="inherit" mr={1}>
                  Coming soon
                </Text>
                <span role="img" aria-label="sad face">
                  😕
                </span>
              </LinkButton>
            </Box>
          </Box>
        </Box>
      </FloatingPill>
    </Box>
  );
}
