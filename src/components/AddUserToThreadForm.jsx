import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useActions } from "../redux";
import * as unboundActions from "../actions/threads";
import UserSearchAutocompleteField from "./UserSearchAutocompleteField";
import { Box, Icon, Paragraph, Spinner } from "./styles";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${themeGet("radii.special")};
  border: 0.2rem solid ${themeGet("colors.primary300")};
  background-color: ${themeGet("colors.trueWhite")};
  box-shadow: ${themeGet("shadows.normal")};
  transition: all ease 0.2s;
  transition: background-color ease ${themeGet("animations.lazy")};
  background-color: ${props => props.background};
  margin-left: -${themeGet("space.2")};
  margin-bottom: ${themeGet("space.3")};
`;

export default function AddUserForm({ thread, onBlur }) {
  const containerEl = useRef(null);
  const inputEl = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("lightyellow");
  const { addUserToThread } = useActions(unboundActions);

  const handleBlur = useCallback(onBlur);

  async function handleAddUser(e, user) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await addUserToThread({ thread, user });
      handleBlur();
    } catch (e) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    inputEl.current.focus();
    setBackgroundColor("white");
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (!containerEl.current.contains(e.target)) {
        handleBlur();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [containerEl, handleBlur]);

  return (
    <Box mt={2} ref={containerEl}>
      <Container background={backgroundColor}>
        {isLoading ? (
          <Spinner
            size="1.4rem"
            color="primary300"
            mx={0}
            ml={2}
            mr="0.45rem"
          />
        ) : (
          <Icon name="add" fontSize={5} ml={1} color="primary300" />
        )}
        <UserSearchAutocompleteField
          ref={inputEl}
          query={query}
          onQueryChange={e => setQuery(e.target.value)}
          results={results}
          onResultsChange={setResults}
          onClick={handleAddUser}
        />
      </Container>
      <Paragraph fontSize={1} color="gray" lineHeight="1.3em">
        Start typing someone's name.
      </Paragraph>
    </Box>
  );
}
