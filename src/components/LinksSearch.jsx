import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Box, DropdownMenu, Input } from "../components/styles";

export default function LinkSearchField({ isOpen, isVisible, onClose }) {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const input = useRef();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => input.current && input.current.focus(), 200);
    }
  }, [isOpen, input]);

  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/links/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    isOpen && onClose();
  }

  return (
    <DropdownMenu isOpen={isOpen} isVisible={isVisible} px="1.4rem" pt="0.8rem">
      <Box as="form" mb="-0.8rem" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query and press enter"
          ref={input}
          onBlur={() => isOpen && onClose()}
        />
      </Box>
    </DropdownMenu>
  );
}
