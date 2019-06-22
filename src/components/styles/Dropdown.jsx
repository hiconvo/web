import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import Box from "./Box";

const Setter = styled.div`
  position: absolute;
  top: 100%;
  right: 0rem;
`;

export default function Dropdown({ renderAnchor, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", toggle);
    }

    return () => {
      document.removeEventListener("click", toggle);
    };
  }, [isOpen, toggle]);

  return (
    <Box position="relative">
      <div>{renderAnchor({ onClick: toggle })}</div>
      <Setter>{children({ isOpen })}</Setter>
    </Box>
  );
}
