import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import Box from "./Box";

const Setter = styled.div`
  position: absolute;
  top: 100%;
  right: 0rem;
`;

export default function Dropdown({ renderAnchor, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggle = useCallback(
    e => {
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    },
    [isOpen]
  );

  const handleToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", toggle);
    }

    return () => {
      document.removeEventListener("click", toggle);
    };
  }, [isOpen, toggle]);

  return (
    <Box position="relative" ref={containerRef}>
      <div>{renderAnchor({ onClick: handleToggle })}</div>
      <Setter>{children({ isOpen, handleToggle })}</Setter>
    </Box>
  );
}
