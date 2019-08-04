import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { FloatingPill, Box, Icon, Text } from "../components/styles";
import ContactsSidebar from "../components/ContactsSidebar";
import ContactCard from "../components/ContactCard";
import { useDebounce, useWade } from "../hooks";
import { useActions, useSelectors } from "../redux";
import { userSearch } from "../api/search";
import { getContacts } from "../selectors";
import * as unboundActions from "../actions/contacts";

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

  ${themeGet("media.phone")} {
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
  const [selectedContact, setSelectedContact] = useState({});
  const { fetchContacts } = useActions(unboundActions);
  const [contacts] = useSelectors(getContacts);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    contacts.length === 0 && fetchContacts();
    inputContainerEl.current && inputContainerEl.current.focus();
    // eslint-disable-next-line
  }, []);

  const debouncedQuery = useDebounce(query, 200);

  const search = useWade(contacts);

  useEffect(() => {
    if (debouncedQuery) {
      userSearch(debouncedQuery).then(payload => {
        setResults(payload.users);
      });
    }
  }, [debouncedQuery, setResults]);

  const filteredContacts = debouncedQuery ? search(debouncedQuery) : contacts;

  return (
    <Container>
      <Main>
        <FloatingBackground>
          <Box flexDirection="row" alignItems="center" mb={4}>
            <Icon name="search" fontSize={6} mr={2} />
            <Input
              type="text"
              placeholder="Search"
              ref={inputContainerEl}
              value={query}
              onChange={handleQueryChange}
            />
          </Box>
          {results.length === 0 && filteredContacts.length === 0 && (
            <Box
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Text mb={5} textAlign="center" p={2}>
                You don't have any contacts yet
              </Text>
            </Box>
          )}
          <Box mb={3}>
            {results.length > 0 && filteredContacts.length > 0 && (
              <Text
                color="darkGray"
                fontSize={2}
                mb={3}
                pb={2}
                borderBottom="lightGray"
              >
                My contacts
              </Text>
            )}
            <Box as="ul" flexDirection="row" flexWrap="wrap">
              {filteredContacts.map(c => (
                <Box as="li" key={c.id} width={["50%", "50%", "25%"]}>
                  <ContactCard
                    contact={c}
                    onClick={() => setSelectedContact(c)}
                  />
                </Box>
              ))}
            </Box>
          </Box>
          {results.length > 0 && (
            <Box mb={3}>
              <Text
                color="darkGray"
                fontSize={2}
                mb={3}
                pb={2}
                borderBottom="lightGray"
              >
                Convo network
              </Text>
              <Box as="ul" flexDirection="row" flexWrap="wrap">
                {results.map(r => (
                  <Box as="li" key={r.id} width={["50%", "50%", "25%"]}>
                    <ContactCard
                      contact={r}
                      onClick={() => setSelectedContact(r)}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </FloatingBackground>
      </Main>
      <ContactsSidebar
        selectedContact={selectedContact}
        isContact={contacts.some(c => c.id === selectedContact.id)}
      />
    </Container>
  );
}
