import React, { useState, useRef, useEffect } from "react";
import Modal from "styled-react-modal";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import { useDebounce, useUserSearch } from "../hooks";
import MemberItemMedium from "./MemberItemMedium";
import MemberItemSmallInline from "./MemberItemSmallInline";
import { Box, Heading, Button, Input, Icon } from "./styles";

const StyledModal = Modal.styled`
  width: 70rem;
  height: 50rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.spread")};
  overflow: hidden;
`;

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
  const { contactsResults, networkResults } = useUserSearch(debouncedQuery);

  useEffect(() => {
    isOpen && inputRef.current && inputRef.current.focus();
  }, [isOpen, inputRef.current]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleAddMember(member) {
    return e => {
      e && e.preventDefault() && e.stopPropagation();

      if (!members.some(m => m.id === member.id)) {
        setMembers(members.concat(member));
        setQuery("");
      }
    };
  }

  function handleRemoveMember(member) {
    return e => {
      e && e.preventDefault() && e.stopPropagation();

      setMembers(
        members.filter(m => {
          if (m.email && member.email) {
            return m.email !== member.email;
          } else {
            return m.id !== member.id;
          }
        })
      );
    };
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onEscapeKeydown={handleClose}
      onBackgroundClick={handleClose}
    >
      <Box flexDirection="row">
        <Box p={3} width="calc(100% - 24rem)">
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
            <ul>
              {contacts.map(member => (
                <MemberItemMedium
                  key={member.id}
                  member={member}
                  onClickOverride={handleAddMember(member)}
                />
              ))}
            </ul>
          </Box>

          <Box mt={3}>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Box>
        </Box>
        <Box p={3} borderLeft="lightGray" backgroundColor="snow" width="24rem">
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
