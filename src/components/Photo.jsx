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

export default function Photo({ src }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ height: "29rem", marginTop: "1rem" }}>
      <Box
        as="img"
        display="block"
        src={src}
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
            src={src}
            borderRadius="normal"
            width="auto"
            maxWidth="70vw"
            height="auto"
            maxHeight="80vh"
            p={2}
          />
        </CenterContent>
      </StyledModal>
    </div>
  );
}
