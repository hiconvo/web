import React, { useState, useEffect, useRef, useCallback } from "react";
import uniqBy from "lodash/uniqBy";

import { useDebounce, useUserSearch, useGoogleContacts } from "../hooks";
import {
  Box,
  Text,
  Avatar,
  Button,
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

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+| |,|;)*$/;
const DELIMITERS_REGEXP = /^[*]|,|;| $/;

/*
 * @Component UserSearchAutocompleteField
 *
 * See <MultiMemberPickerField /> for example usage
 *
 * @param {string} query
 * @param {(string) => string} onQueryChange
 * @param {any[]} results
 * @param {any[] => any[]} onResultsChange
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
    const [
      isEnabledGoogleContacts,
      initGoogleContacts,
      searchGoogleContacts
    ] = useGoogleContacts();
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
            handleResultsChange([
              {
                email: debouncedQuery,
                fullName: debouncedQuery,
                id: debouncedQuery
              }
            ]);
          }
        } else {
          handleResultsChange(
            uniqBy(
              contactsResults.concat(
                networkResults,
                searchGoogleContacts(query)
              ),
              "id"
            )
          );
        }
        setIsDropdownOpen(true);
      }
    }, [
      debouncedQuery,
      networkResults,
      contactsResults,
      handleResultsChange,
      handleClick
    ]);

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
            {results.length < 1 ? (
              <Text px={3} py={2} color="gray" fontSize={2} display="block">
                No results{" "}
                <span role="img" aria-label="sad face">
                  🙁
                </span>
              </Text>
            ) : (
              results.map(result => (
                <DropDownItem
                  key={result.id}
                  member={result}
                  onClick={e => handleClick(e, result)}
                />
              ))
            )}
            {isEnabledGoogleContacts && (
              <Button onClick={initGoogleContacts}>Google contacts</Button>
            )}
          </AutoCompleteDropDown>
        </Box>
      </Box>
    );
  }
);
