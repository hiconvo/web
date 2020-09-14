import React, { useState, useRef } from "react";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import * as unboundNotifActions from "../actions/notifications";
import { useActions } from "../redux";
import { getMagicLink, rollMagicLink } from "../api/events";
import { Heading, Paragraph, Text, Box, Input, Button } from "./styles";

const StyledModal = Modal.styled`
  width: 100%;
  max-width: 60rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
  margin: 2rem;
`;

export default function MagicLinkButton({ render, user, event }) {
  const inputRef = useRef(null);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [magicLink, setMagicLink] = useState("");

  function openModal() {
    _getMagicLink();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function _getMagicLink() {
    setIsLoading(true);

    try {
      const { url } = await getMagicLink(event.id);
      setMagicLink(url);
    } catch (e) {
      setMagicLink("Whoops! Something went wrong. Please try again.");
      return;
    }

    setIsLoading(false);
  }

  async function _rollMagicLink() {
    setIsLoading(true);

    try {
      const { url } = await rollMagicLink(event.id);
      setMagicLink(url);
    } catch (e) {
      setMagicLink("Whoops! Something went wrong. Please try again.");
      return;
    }

    dispatchNotification({ message: "Link invalidated" });
    dispatchNotification({ message: "New shareable link generated" });
    setIsLoading(false);
  }

  function handleLinkClick() {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      dispatchNotification({ message: "Copied to clipboard" });
    }
  }

  return (
    <React.Fragment>
      {render(openModal)}
      <StyledModal
        isOpen={isOpen}
        onEscapeKeydown={closeModal}
        onBackgroundClick={closeModal}
      >
        <Box p={4}>
          <Heading as="h2" fontSize={4} fontWeight="semiBold">
            Shareable link{" "}
            <span role="img" aria-label="link">
              🔗
            </span>{" "}
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          </Heading>
          <Paragraph>
            Share this link with people via text message, email, or any other
            means to invite them to your event.{" "}
            <Text fontStyle="italic">
              Anyone with access to this link will be able to see your event
              page and join your event.
            </Text>
          </Paragraph>
          <Box mb={2} onClick={handleLinkClick}>
            <Input
              value={magicLink}
              onChange={() => {}}
              ref={inputRef}
              readonly
            />
          </Box>
          <Paragraph>
            If your link gets into the wrong hands, you can click the{" "}
            <Text fontWeight="bold">Deactivate</Text> button below to invalidate
            your original link.{" "}
            <Text fontStyle="italic">
              This will make the existing link useless
            </Text>{" "}
            and generate a new link for you to share.
          </Paragraph>
          <Box flexDirection="row" justifyContent="center" with="100%">
            <Button
              variant="secondary"
              mr={3}
              width="16rem"
              onClick={_rollMagicLink}
              isLoading={isLoading}
            >
              <Text fontWeight="inherit" color="inherit">
                Deactivate
              </Text>
            </Button>
            <Button variant="primary" width="16rem" onClick={closeModal}>
              <Text fontWeight="inherit" color="inherit">
                Done
              </Text>
            </Button>
          </Box>
        </Box>
      </StyledModal>
    </React.Fragment>
  );
}
