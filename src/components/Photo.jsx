import React, { useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import { Box, Icon, CenterContent } from "./styles";

const StyledModal = Modal.styled`
  padding: ${themeGet("space.3")};
  justify-content: center;
`;

const CloseButtonContainer = styled.div`
  display: block;
  position: fixed;
  right: 2rem;
  top: 2rem;
  z-index: 40;
`;

export default function Photo({ src, height = "29rem", ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const fixedSrc = src.startsWith("https://")
    ? src
    : `https://storage.googleapis.com/convo-photos/${src}`;

  return (
    <Box display="block" height={height} {...rest}>
      <Box
        as="img"
        display="block"
        src={fixedSrc}
        borderRadius="normal"
        width="auto"
        maxWidth="100%"
        height="auto"
        maxHeight="100%"
        cursor="zoom-in"
        onClick={() => setIsOpen(true)}
      />
      <StyledModal isOpen={isOpen} onBackgroundClick={() => setIsOpen(false)}>
        <CloseButtonContainer>
          <Icon onClick={() => setIsOpen(false)} name="close" fontSize={5} />
        </CloseButtonContainer>
        <CenterContent>
          <Box
            as="img"
            display="block"
            src={fixedSrc}
            borderRadius="normal"
            width="auto"
            maxWidth="70vw"
            height="auto"
            maxHeight="80vh"
            p={2}
          />
        </CenterContent>
      </StyledModal>
    </Box>
  );
}
