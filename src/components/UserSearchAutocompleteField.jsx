import React, { useState, useEffect, useRef, useCallback } from "react";

import { useDebounce, useUserSearch, useGoogleContacts } from "../hooks";
import {
  Box,
  Text,
  Avatar,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteDropDown
} from "./styles";

function DropDownItem({ member, onClick }) {
  return (
    <li>
      <AutoCompleteItem onClick={onClick}>
        <Avatar src={member.avatar} size="3rem" />
        <Box ml={2}>
          <Text>{member.fullName || "Unregistered"}</Text>
          {member.googleContact && (
            <Text color="darkGray" fontSize={0}>
              {member.email}
            </Text>
          )}
        </Box>
      </AutoCompleteItem>
    </li>
  );
}

function ResultSection({ sectionName, results, onClick }) {
  return (
    <Box mb={2}>
      <Text fontSize={0} color="gray" px={3} pb={1}>
        {sectionName}
      </Text>
      <Box as="ul">
        {results.map(result => (
          <DropDownItem
            key={result.id}
            member={result}
            onClick={e => onClick(e, result)}
          />
        ))}
      </Box>
    </Box>
  );
}

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+| |,|;)*$/;
const DELIMITERS_REGEXP = /^[*]|,|;| $/;

export const USER_SEARCH_DEFAULT_STATE = {
  emailAddress: [],
  contactsResults: [],
  networkResults: [],
  googleResults: []
};

/*
 * @Component UserSearchAutocompleteField
 *
 * See <MultiMemberPickerField /> for example usage
 *
 * @param {string} query
 * @param {(string) => string} onQueryChange
 * @param {Object} results - form of USER_SEARCH_DEFAULT_STATE
 * @param {Object => Object} onResultsChange - form of USER_SEARCH_DEFAULT_STATE
 * @param {clickedResult => undefined} onClick
 * @param {ref} ref
 */
export default React.forwardRef(
  ({ query, results, onQueryChange, onResultsChange, onClick }, ref) => {
    const inputContainerEl = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const debouncedQuery = useDebounce(query, 200);
    const handleResultsChange = useCallback(onResultsChange);
    const { contactsResults, networkResults } = useUserSearch(debouncedQuery);
    const [, , searchGoogleContacts] = useGoogleContacts();
    const handleClick = useCallback(onClick, [query]);

    useEffect(() => {
      if (debouncedQuery) {
        const isEmail = EMAIL_REGEXP.test(debouncedQuery);
        if (isEmail) {
          // If the user put a space, comma, or semicolin, return the email.
          if (DELIMITERS_REGEXP.test(debouncedQuery)) {
            const email = debouncedQuery.slice(0, debouncedQuery.length - 1);

            handleClick(null, {
              email,
              fullName: email,
              id: email
            });
          } else {
            handleResultsChange({
              emailAddress: [
                {
                  email: debouncedQuery,
                  fullName: debouncedQuery,
                  id: debouncedQuery
                }
              ],
              contactsResults: [],
              networkResults: [],
              googleResults: []
            });
          }
        } else {
          handleResultsChange({
            emailAddress: [],
            contactsResults,
            networkResults,
            googleResults: searchGoogleContacts(debouncedQuery)
          });
        }
        setIsDropdownOpen(true);
      }
    }, [
      debouncedQuery,
      networkResults,
      contactsResults,
      handleResultsChange,
      handleClick,
      searchGoogleContacts
    ]);

    useEffect(() => {
      function handleCloseDropdown(e) {
        if (!inputContainerEl.current.contains(e.target)) {
          if (EMAIL_REGEXP.test(debouncedQuery)) {
            handleClick(null, {
              email: debouncedQuery,
              fullName: debouncedQuery,
              id: debouncedQuery
            });
          }
          setIsDropdownOpen(false);
        }
      }

      if (isDropdownOpen) {
        document.addEventListener("click", handleCloseDropdown);
      }

      return () => {
        document.removeEventListener("click", handleCloseDropdown);
      };
    }, [
      isDropdownOpen,
      setIsDropdownOpen,
      inputContainerEl,
      debouncedQuery,
      handleClick
    ]);

    return (
      <Box position="relative" minWidth="28rem" ref={inputContainerEl}>
        <AutoCompleteInput
          ref={ref}
          type="text"
          placeholder="Type someone's name or email"
          value={query}
          onChange={onQueryChange}
        />
        <Box position="absolute" left="0" top="100%">
          <AutoCompleteDropDown isOpen={isDropdownOpen}>
            {results.contactsResults.length < 1 &&
              results.googleResults.length < 1 &&
              results.emailAddress.length < 1 &&
              results.networkResults.length < 1 && (
                <Text px={3} py={2} color="gray" fontSize={2} display="block">
                  No results{" "}
                  <span role="img" aria-label="sad face">
                    🙁
                  </span>
                </Text>
              )}

            {results.emailAddress.length > 0 && (
              <ResultSection
                sectionName="Email address"
                results={results.emailAddress}
                onClick={handleClick}
              />
            )}

            {results.contactsResults.length > 0 && (
              <ResultSection
                sectionName="From your Convo contacts"
                results={results.contactsResults}
                onClick={handleClick}
              />
            )}

            {results.googleResults.length > 0 && (
              <ResultSection
                sectionName="From your Google contacts"
                results={results.googleResults}
                onClick={handleClick}
              />
            )}

            {results.networkResults.length > 0 && (
              <ResultSection
                sectionName="From the Convo network"
                results={results.networkResults}
                onClick={handleClick}
              />
            )}
          </AutoCompleteDropDown>
        </Box>
      </Box>
    );
  }
);
