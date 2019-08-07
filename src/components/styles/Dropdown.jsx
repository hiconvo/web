import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import Box from "./Box";

const Setter = styled.div`
  position: absolute;
  top: 100%;
  right: 0rem;
  z-index: 30;
`;

export default function Dropdown({ renderAnchor, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 200);
      setIsVisible(false);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [isOpen]);

  const handleClick = useCallback(
    e => {
      if (!containerRef.current.contains(e.target)) {
        handleToggle();
      }
    },
    [handleToggle]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, handleClick]);

  return (
    <Box position="relative" ref={containerRef}>
      <div>{renderAnchor({ onClick: handleToggle })}</div>
      <Setter>{children({ isOpen, isVisible, handleToggle })}</Setter>
    </Box>
  );
}
