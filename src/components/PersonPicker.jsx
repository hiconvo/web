import React, { useState, useRef, useEffect } from "react";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { useDebounce, useUserSearch } from "../hooks";
import MemberItemMedium from "./MemberItemMedium";
import MemberItemSmallInline from "./MemberItemSmallInline";
import { Box, Heading, Button, Input, Icon, Paragraph } from "./styles";

const StyledModal = Modal.styled`
  width: 70rem;
  height: 50rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.spread")};
  overflow: hidden;
  margin: 2rem;
`;

function NullState() {
  return (
    <Box justifyContent="center" alignItems="center" width="100%" height="100%">
      <Paragraph textAlign="center" p={2}>
        You haven't added any contacts yet. Start by adding someone by email.
      </Paragraph>
    </Box>
  );
}

function ResultSection({
  sectionName,
  results,
  onClickGenerator,
  isCheckedFunc
}) {
  return (
    <Box mb={2}>
      <Heading as="h5" fontSize={0} color="gray" ml={2} mb={0}>
        {sectionName}
      </Heading>
      <ul>
        {results.map(result => (
          <MemberItemMedium
            key={result.id}
            member={result}
            onClickOverride={onClickGenerator(result)}
            isChecked={isCheckedFunc(result)}
          />
        ))}
      </ul>
    </Box>
  );
}

export default function PersonPicker({
  isOpen,
  setIsOpen,
  members,
  setMembers,
  headingText
}) {
  const inputRef = useRef(null);
  const [contacts] = useSelectors(getContacts);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const { contactsResults, networkResults, emailAddress } = useUserSearch(
    debouncedQuery
  );

  useEffect(() => {
    isOpen && inputRef.current && inputRef.current.focus();
  }, [isOpen, inputRef]);

  function handleClose() {
    setIsOpen(false);
  }

  function isChecked(member) {
    return members.some(m => member.id === m.id);
  }

  function addMember(member) {
    setMembers(members.concat(member));
  }

  function removeMember(member) {
    setMembers(
      members.filter(m => {
        if (m.email && member.email) {
          return m.email !== member.email;
        } else {
          return m.id !== member.id;
        }
      })
    );
  }

  function handleAddMember(member) {
    return e => {
      e && e.preventDefault() && e.stopPropagation();

      if (!members.some(m => m.id === member.id)) {
        addMember(member);
        setQuery("");
        isOpen && inputRef.current && inputRef.current.focus();
      } else {
        removeMember(member);
      }
    };
  }

  function handleRemoveMember(member) {
    return e => {
      e && e.preventDefault() && e.stopPropagation();

      removeMember(member);
    };
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onEscapeKeydown={handleClose}
      onBackgroundClick={handleClose}
    >
      <Box flexDirection="row">
        <Box p={3} width={["100%", "calc(100% - 24rem)"]}>
          <Box borderBottom="dashed" mb={3}>
            <Heading as="h3" fontSize={3} fontWeight="semiBold" mb={1}>
              {headingText}
            </Heading>

            <Box position="relative">
              <Box
                position="absolute"
                top="1rem"
                left="1rem"
                height="calc(100% - 2.8rem)"
                justifyContent="center"
              >
                <Icon name="search" fontSize={4} />
              </Box>
              <Input
                ref={inputRef}
                placeholder="Type someone's name or email"
                value={query}
                onChange={e => setQuery(e.target.value)}
                p={0}
                pl="4rem"
                pr={1}
                pt={1}
                pb={1}
              />
            </Box>
          </Box>

          <Box height="27.8rem" overflow="scroll">
            {query.length > 0 && emailAddress.length > 0 && (
              <ResultSection
                sectionName="Email address"
                results={emailAddress}
                onClickGenerator={handleAddMember}
                isCheckedFunc={isChecked}
              />
            )}
            {query.length === 0 && contacts.length > 0 && (
              <ResultSection
                sectionName="Contacts"
                results={contacts}
                onClickGenerator={handleAddMember}
                isCheckedFunc={isChecked}
              />
            )}
            {query.length > 0 && contactsResults.length > 0 && (
              <ResultSection
                sectionName="Contacts"
                results={contactsResults}
                onClickGenerator={handleAddMember}
                isCheckedFunc={isChecked}
              />
            )}
            {query.length > 0 && networkResults.length > 0 && (
              <ResultSection
                sectionName="Network"
                results={networkResults}
                onClickGenerator={handleAddMember}
                isCheckedFunc={isChecked}
              />
            )}
            {query.length === 0 && contacts.length === 0 && <NullState />}
          </Box>

          <Box mt={3}>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Box>
        </Box>
        <Box
          p={3}
          borderLeft="lightGray"
          backgroundColor="snow"
          width="24rem"
          display={["none", "flex"]}
        >
          <Heading as="h4" color="gray" mb={2} fontSize={0}>
            Selected
          </Heading>

          <Box height="calc(100% - 7.2rem)" overflowY="scroll">
            <ul>
              {members.map(member => (
                <MemberItemSmallInline
                  key={member.id}
                  p={0}
                  m={0}
                  mb={3}
                  justifyContent="flex-start"
                  backgroundColor="unset"
                  member={member}
                  onDelete={handleRemoveMember(member)}
                />
              ))}
            </ul>
          </Box>
        </Box>
      </Box>
    </StyledModal>
  );
}
