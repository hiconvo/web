import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useDebounce } from "../hooks";
import { userSearch } from "../api/search";
import MemberItemSmall from "./MemberItemSmall";
import { Box, Text } from "./styles";

const Input = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  width: 100%;
`;

const List = styled.ul`
  width: 16rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  padding: ${themeGet("space.2")} 0;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isOpen ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  z-index: 30;
`;

const Item = styled.button`
  padding: ${themeGet("space.2")} ${themeGet("space.3")};
  font-size: ${themeGet("fontSizes.2")};
  background: inherit;
  border: none;
  font-family: inherit;
  text-align: left;
  width: 100%;

  &:focus,
  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
  }
`;

function DropDownItem({ member, onClick }) {
  return (
    <li>
      <Item onClick={onClick}>{member.fullName}</Item>
    </li>
  );
}

export default function MemberPicker({ members, setMembers }) {
  const inputEl = useRef(null);
  const inputContainerEl = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 200);

  function handleAddMember(member) {
    return e => {
      e.preventDefault();

      if (!members.some(m => m.id === member.id)) {
        setMembers(members.concat(member));
        setQuery("");
        setResults([]);
        inputEl.current.focus();
      }
    };
  }

  function handleRemoveMember(member) {
    return () => {
      setMembers(members.filter(m => m.id !== member.id));
      inputEl.current.focus();
    };
  }

  useEffect(() => {
    if (debouncedQuery) {
      userSearch(debouncedQuery).then(payload => {
        setResults(payload.users);
        setIsDropdownOpen(true);
      });
    }
  }, [debouncedQuery]);

  useEffect(() => {
    function handleCloseDropdown(e) {
      if (!inputContainerEl.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("click", handleCloseDropdown);
    }

    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, [isDropdownOpen, setIsDropdownOpen, inputContainerEl]);

  return (
    <Box flexDirection="row">
      <Box as="ul" flexDirection="row" alignItems="center">
        {members.map(member => (
          <MemberItemSmall
            key={member.id}
            member={member}
            onDelete={handleRemoveMember(member)}
          />
        ))}
      </Box>
      <Box position="relative" ref={inputContainerEl}>
        <Input
          ref={inputEl}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Box position="absolute" left="0" top="100%">
          <List isOpen={isDropdownOpen}>
            {results.length < 1 ? (
              <Text px={3} py={2} color="gray" fontSize={2} display="block">
                No results
              </Text>
            ) : (
              results.map(result => (
                <DropDownItem
                  key={result.id}
                  member={result}
                  onClick={handleAddMember(result)}
                />
              ))
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
