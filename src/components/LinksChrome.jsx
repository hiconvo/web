import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import {
  Text,
  Box,
  LinkButton,
  IconButton,
  Icon,
  Dropdown,
  DropdownMenu,
  Input
} from "../components/styles";
import { upperFirstLetter } from "../utils";

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

function LinkFilterMenu({ isOpen, isVisible }) {
  const [user] = useSelectors(getUser);

  return (
    <DropdownMenu
      isOpen={isOpen}
      isVisible={isVisible}
      px="1.4rem"
      pt="0.8rem"
      width="16rem"
    >
      <Box as="ul" mb={2}>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links/?filter=note"
          >
            Notes
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links/?filter=link"
          >
            Links
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links"
          >
            Remove Filter
          </LinkButton>
        </li>

        {user.tags.length > 0 && (
          <Box px={2} py={1}>
            <Text fontSize={1} color="gray">
              Tags
            </Text>
          </Box>
        )}

        {user.tags.map((tag) => (
          <li key={tag}>
            <LinkButton
              variant="tertiary"
              textAlign="left"
              justifyContent="flex-start"
              px={2}
              py={1}
              to={`/links/tags?tag=${encodeURIComponent(tag)}`}
            >
              {upperFirstLetter(tag)}
            </LinkButton>
          </li>
        ))}

        {user.tags.length > 0 && <Box py={1} />}
      </Box>
    </DropdownMenu>
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
              mobileHideText={true}
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
        <Dropdown
          side="left"
          renderAnchor={({ onClick }) => (
            <IconButton
              mobileHideText={true}
              onClick={onClick}
              iconName="filter_alt"
              text="Filter"
              mr={2}
            />
          )}
        >
          {({ isOpen, isVisible, handleToggle }) => (
            <LinkFilterMenu
              isOpen={isOpen}
              isVisible={isVisible}
              onClose={handleToggle}
            />
          )}
        </Dropdown>
        {onRefresh && (
          <IconButton
            mobileHideText={true}
            iconName="refresh"
            text="Refresh"
            onClick={onRefresh}
            mr={2}
          />
        )}
      </Box>
      <Box>
        <LinkButton variant="action" to="/notes/new">
          <Icon name="edit" />
          <Text ml={2} color="inherit" display={["none", "inline"]}>
            New Note
          </Text>
        </LinkButton>
      </Box>
    </Box>
  );
}
