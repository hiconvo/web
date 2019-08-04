import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { FloatingPill, Box, Icon } from "../components/styles";
import ContactsSidebar from "../components/ContactsSidebar";
import { useDebounce } from "../hooks";
import { userSearch } from "../api/search";

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${themeGet("sidebarWidth")};
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});

  ${themeGet("media.phone")} {
    grid-template-columns: minmax(0, 1fr) 0;
    & > div:nth-child(2) {
      visibility: hidden;
    }
  }
`;

const Main = styled.main`
  display: block;
  padding-right: ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-right: 0;
  }
`;

const FloatingBackground = styled(FloatingPill)`
  height: calc(100% - ${themeGet("headerHeight")});
`;

const Input = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.5")};
  width: calc(100% - ${themeGet("space.2")} * 2);
  background-color: transparent;
`;

export default function Contacts() {
  const inputContainerEl = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    inputContainerEl.current && inputContainerEl.current.focus();
  }, []);

  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (debouncedQuery) {
      userSearch(debouncedQuery).then(payload => {
        setResults(payload.users);
      });
    }
  }, [debouncedQuery, setResults]);

  return (
    <Container>
      <Main>
        <FloatingBackground>
          <Box flexDirection="row" alignItems="center" mb={3}>
            <Icon name="search" fontSize={6} mr={2} />
            <Input
              type="text"
              placeholder="Search"
              ref={inputContainerEl}
              value={query}
              onChange={handleQueryChange}
            />
          </Box>
          <Box>
            {results.map(result => (
              <div>{result.fullName}</div>
            ))}
          </Box>
        </FloatingBackground>
      </Main>
      <ContactsSidebar />
    </Container>
  );
}
