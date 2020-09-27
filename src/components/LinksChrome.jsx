import React, { useState, useRef, useEffect } from "react";
import "styled-components/macro";
import css from "@styled-system/css";
import { useHistory } from "react-router-dom";

import {
  Text,
  Box,
  LinkButton,
  IconButton,
  Icon,
  Dropdown,
  Input
} from "../components/styles";

function LinkSearchField({ isOpen, isVisible, onClose }) {
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
    <Box
      css={css({
        display: isOpen ? "block" : "none",
        backgroundColor: "trueWhite",
        borderRadius: "normal",
        boxShadow: "normal",
        paddingTop: "0.8rem",
        paddingLeft: "1.4rem",
        paddingRight: "1.4rem",
        visibility: isVisible ? "visible" : "hidden",
        transition: "all ease 0.2s",
        opacity: isVisible ? "1" : "0"
      })}
    >
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
    </Box>
  );
}

export default function LinksChrome({ onRefresh, withBackButton }) {
  const history = useHistory();

  function handleBack() {
    history.push("/links");
  }

  return (
    <Box flexDirection="row" justifyContent="space-between" mb={4}>
      <Box flexDirection="row" justifyContent="flex-start">
        {withBackButton && (
          <IconButton
            iconName="chevron_left"
            text="Back"
            mr={2}
            onClick={handleBack}
          />
        )}
        <Dropdown
          side="left"
          renderAnchor={({ onClick }) => (
            <IconButton
              onClick={onClick}
              iconName="search"
              text="Search"
              mr={2}
            />
          )}
        >
          {({ isOpen, isVisible, handleToggle }) => (
            <LinkSearchField
              isOpen={isOpen}
              isVisible={isVisible}
              onClose={handleToggle}
            />
          )}
        </Dropdown>
        <IconButton iconName="filter_alt" text="Filter" mr={2} />
        {onRefresh && (
          <IconButton
            iconName="refresh"
            text="Refresh"
            onClick={onRefresh}
            mr={2}
          />
        )}
      </Box>
      <Box>
        <LinkButton variant="action" to="/notes/new">
          <Icon name="edit" mr={2} />
          <Text color="inherit">New Note</Text>
        </LinkButton>
      </Box>
    </Box>
  );
}
