import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getContacts } from "../selectors";
import {
  Dropdown,
  Button,
  Icon,
  Text,
  UnstyledButton,
  Paragraph,
  Box
} from "./styles";

const DropdownItemsContainer = styled.ul`
  display: ${props => (props.isOpen ? "block" : "none")};
  width: 28rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;
  overflow: hidden;
`;

const DropdownLineItem = styled.li`
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  transition: all ease ${themeGet("animations.fast")};

  &:hover {
    background-color: ${themeGet("colors.snow")};
  }
`;

const OPTIONS = [
  {
    name: "All your contacts",
    icon: "people",
    description: "All your Convo contacts"
  },
  {
    name: "Specific people",
    icon: "group_add",
    description: "Only selected people"
  },
  {
    name: "Just you",
    icon: "person",
    description: "Only you can see this post"
  }
];

export default function SharePicker({ members, setMembers }) {
  const [selected, setSelected] = useState(OPTIONS[2]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const contacts = useSelectors(getContacts);

  function generateClickHandler(opt) {
    return function handleClick(e) {
      e && e.preventDefault();
      setSelected(opt);

      switch (opt.name) {
        case OPTIONS[0].name:
          setMembers(contacts);
          break;
        case OPTIONS[1].name:
          setMembers([]);
          setIsPickerOpen(true);
          break;
        case OPTIONS[2].name:
          setMembers([]);
          break;
      }
    };
  }

  return (
    <Dropdown
      renderAnchor={({ onClick }) => (
        <Button
          variant="secondary"
          p={0}
          py="0.6rem"
          px="0.8rem"
          mb={0}
          onClick={onClick}
        >
          <Icon name={selected.icon} mx={1} fontSize={3} />
          <span>{selected.name}</span>
          <Icon name="arrow_drop_down" ml={1} fontSize={3} />
        </Button>
      )}
    >
      {({ isOpen, isVisible, handleToggle }) => (
        <DropdownItemsContainer
          isOpen={isOpen}
          isVisible={isVisible}
          onClick={handleToggle}
        >
          {OPTIONS.map(opt => (
            <DropdownLineItem>
              <UnstyledButton
                onClick={generateClickHandler(opt)}
                width="100%"
                alignItems="flex-start"
                p={1}
              >
                <Box flexDirection="row" alignItems="center">
                  <Icon name={opt.icon} fontSize={3} mr={1} />
                  <Text fontWeight="semiBold">{opt.name}</Text>
                </Box>
                <Box>
                  <Paragraph fontSize={1} mb={0}>
                    {opt.description}
                  </Paragraph>
                </Box>
              </UnstyledButton>
            </DropdownLineItem>
          ))}
        </DropdownItemsContainer>
      )}
    </Dropdown>
  );
}
