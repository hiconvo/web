import React from "react";

import {
  Box,
  Heading,
  FloatingPill,
  LinkButton,
  Text
} from "../components/styles";

export default function Extensions() {
  return (
    <Box mx="auto" width="100%" maxWidth="100rem">
      <FloatingPill>
        <Box>
          <Heading
            as="h1"
            fontSize={4}
            fontWeight="semiBold"
            textAlign="center"
          >
            Save your links with Convo's browser extension
          </Heading>
        </Box>
        <Box flexDirection={["column", "row"]} width="100%" mb={4}>
          <Box width={["100%", "33%"]} alignItems="center">
            <Box
              as="img"
              width="100%"
              maxWidth="30rem"
              src="/browsers/firefox.jpg"
            />
            <LinkButton
              variant="secondary"
              to="https://addons.mozilla.org/en-US/firefox/addon/convo/"
            >
              Download for Firefox
            </LinkButton>
          </Box>
          <Box width={["100%", "33%"]} alignItems="center">
            <Box
              as="img"
              width="100%"
              maxWidth="30rem"
              src="/browsers/chrome-brave.jpg"
            />
            <LinkButton
              variant="secondary"
              to="https://chrome.google.com/webstore/detail/convo/oneifhdbldlgdldmihfgmpiknhghcble"
            >
              Download for Chrome and Brave
            </LinkButton>
          </Box>
          <Box width={["100%", "33%"]} alignItems="center">
            <Box
              as="img"
              width="100%"
              maxWidth="30rem"
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
      </FloatingPill>
    </Box>
  );
}
