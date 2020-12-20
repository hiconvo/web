import React, { useState } from "react";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import {
  Box,
  FloatingPill,
  Heading,
  Paragraph,
  LinkButton,
  Text,
  FixedAspectRatioImage
} from "../components/styles";

const StyledModal = Modal.styled`
  width: 100%;
  max-width: 60rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
  margin: 2rem;
`;

export default function LinksNullState() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box maxWidth="80rem" width="100%" margin="auto">
      <FloatingPill>
        <Box mb={4}>
          <Heading fontSize={5} fontWeight="bold">
            Save links as you browse
          </Heading>

          <Paragraph fontSize={3} maxWidth="60rem">
            Add the{" "}
            <Text
              role="button"
              onClick={() => setIsOpen(true)}
              fontSize="inherit"
              cursor="pointer"
              textDecoration="underline"
            >
              browser extension
            </Text>{" "}
            to save links, take notes, and tag, search, and filter items.
            Available on{" "}
            <Text
              as="a"
              href="https://addons.mozilla.org/en-US/firefox/addon/convo/"
              fontSize="inherit"
              textDecoration="underline"
            >
              Firefox
            </Text>
            ,{" "}
            <Text
              as="a"
              href="https://chrome.google.com/webstore/detail/convo/oneifhdbldlgdldmihfgmpiknhghcble"
              fontSize="inherit"
              textDecoration="underline"
            >
              Chrome
            </Text>
            , and{" "}
            <Text
              as="a"
              href="https://chrome.google.com/webstore/detail/convo/oneifhdbldlgdldmihfgmpiknhghcble"
              fontSize="inherit"
              textDecoration="underline"
            >
              Brave
            </Text>
            .
          </Paragraph>

          <Box mt={3} mb={2} maxWidth="70rem">
            <FixedAspectRatioImage
              src="/screenshots/links-hero.png"
              width={700}
              height={374}
            />
          </Box>

          <StyledModal
            isOpen={isOpen}
            onBackgroundClick={() => setIsOpen(false)}
            onEscapeKeydown={() => setIsOpen(false)}
          >
            <Box flexDirection={["column", "row"]} width="100%" py={4}>
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
                  Chrome & Brave
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
          </StyledModal>
        </Box>
      </FloatingPill>
    </Box>
  );
}
