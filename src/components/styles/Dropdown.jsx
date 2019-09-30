import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import Box from "./Box";

const Setter = styled.div`
  position: absolute;
  top: 100%;
  z-index: 30;
  ${props => (props.side === "left" ? "left: 0rem;" : "right: 0rem;")}
  ${props => (props.stretch ? "width: 100%;" : "")}
`;

export default function Dropdown({
  renderAnchor,
  children,
  stretch,
  side = "right",
  initialState = "closed",
  ...rest
}) {
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

  useEffect(() => {
    if (initialState === "open") handleToggle();
    // eslint-disable-next-line
  }, [initialState]);

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
    <Box position="relative" ref={containerRef} {...rest}>
      <div>{renderAnchor({ onClick: handleToggle })}</div>
      <Setter side={side} stretch={stretch}>
        {children({ isOpen, isVisible, handleToggle })}
      </Setter>
    </Box>
  );
}
