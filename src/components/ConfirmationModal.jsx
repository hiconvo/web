import React from "react";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import { Box, Heading, Button } from "./styles";

const StyledModal = Modal.styled`
  width: 100%;
  max-width: 60rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
`;

export default function ConfirmationModal({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
  children
}) {
  return (
    <StyledModal
      isOpen={isOpen}
      onEscapeKeydown={onCancel}
      onBackgroundClick={onCancel}
    >
      <Box p={4}>
        <Heading as="h3" fontSize={3} textAlign="center" fontWeight="semiBold">
          Are you sure?
        </Heading>
        <Box mx="auto" p={2}>
          {children}
        </Box>
        <Box flexDirection="row" justifyContent="center" width="100%">
          <Button onClick={onCancel} mr={3} variant="secondary" width="16rem">
            Cancel
          </Button>
          <Button onClick={onConfirm} isLoading={isLoading} width="16rem">
            Confirm
          </Button>
        </Box>
      </Box>
    </StyledModal>
  );
}
