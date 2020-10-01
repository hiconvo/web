import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import "styled-components/macro";
import css from "@styled-system/css";

import Box from "./Box";

const Setter = styled.div`
  position: absolute;
  top: 100%;
  z-index: 30;
  ${(props) => (props.side === "left" ? "left: 0rem;" : "right: 0rem;")}
  ${(props) => (props.stretch ? "width: 100%;" : "")}
`;

export function DropdownMenu({ children, isVisible, isOpen, ...rest }) {
  return (
    <Box
      css={css({
        display: isOpen ? "block" : "none",
        backgroundColor: "trueWhite",
        borderRadius: "normal",
        boxShadow: "normal",
        visibility: isVisible ? "visible" : "hidden",
        transition: "all ease 0.2s",
        transform: isVisible ? "translateY(0rem)" : "translateY(-1rem)",
        opacity: isVisible ? "1" : "0",
        zIndex: "30"
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}

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
  const timeout = useRef(null);

  const handleToggle = useCallback(
    (e) => {
      e && e.stopPropagation();

      if (isOpen) {
        setIsVisible(false);
        timeout.current = setTimeout(() => setIsOpen(false), 200);
      } else {
        setIsOpen(true);
        timeout.current = setTimeout(() => setIsVisible(true), 50);
      }
    },
    [isOpen, timeout]
  );

  useEffect(() => {
    if (initialState === "open") handleToggle();
    // eslint-disable-next-line
  }, [initialState]);

  const handleClick = useCallback(
    (e) => {
      // This bgEl stuff covers the case of clicking inside of a modal that is
      // inside a dropdown. Since the modal is rendered to the modal node
      // the containerRef does not contain it. So clicking anywhere closes
      // the dropdown behind the modal, which is a weird UX.
      const bgEl = document.getElementById("ModalBackground");
      const clickInModal = bgEl && bgEl.contains(e.target);

      if (!containerRef.current.contains(e.target) && !clickInModal) {
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
      if (isOpen) {
        timeout.current && clearTimeout(timeout.current);
      }
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
