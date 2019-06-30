import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useDebounce } from "../hooks";
import { userSearch } from "../api/search";
import { Box, UnstyledButton } from "./styles";

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
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isOpen ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  z-index: 30;
`;

const Item = styled.li`
  padding: ${themeGet("space.3")};
  font-size: ${themeGet("fontSizes.2")};
`;

export default function MemberPicker({ members, setMembers }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query, 300);

  function handleAddMember(member) {
    return () => {
      if (!members.some(m => m.id === member.id)) {
        setMembers(members.concat(member));
        setQuery("");
        setResults([]);
      }
    };
  }

  function handleRemoveMember(member) {
    return () => setMembers(members.filter(m => m.id !== member.id));
  }

  useEffect(() => {
    if (debouncedQuery) {
      userSearch(debouncedQuery).then(payload => {
        setResults(payload.users);
      });
    }
  }, [debouncedQuery]);

  return (
    <Box flexDirection="row">
      <Box as="ul" flexDirection="row">
        {members.map(member => (
          <li onClick={handleRemoveMember(member)}>{member.fullName}</li>
        ))}
      </Box>
      <Box position="relative">
        <Input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Box position="absolute" left="0" top="100%">
          <List isOpen={results.length > 0}>
            {results.map(result => (
              <Item>
                <UnstyledButton onClick={handleAddMember(result)}>
                  {result.fullName}
                </UnstyledButton>
              </Item>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
