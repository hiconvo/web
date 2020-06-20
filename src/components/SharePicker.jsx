import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import PersonPicker from "./PersonPicker";
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
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 28rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
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
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  let selected;
  if (members.length === 0) {
    selected = OPTIONS[1];
  } else {
    selected = OPTIONS[0];
  }

  function generateClickHandler(opt) {
    return function handleClick(e) {
      e && e.preventDefault();

      switch (opt.name) {
        case OPTIONS[0].name:
          setIsPickerOpen(true);
          break;
        case OPTIONS[1].name:
          setMembers([]);
          break;
        default:
          break;
      }
    };
  }

  const summary = members.map((m) => m.fullName).join(", ");

  return (
    <React.Fragment>
      <Dropdown
        renderAnchor={({ onClick }) => (
          <Button
            variant="secondary"
            p={0}
            py="0.6rem"
            px="0.8rem"
            mb={0}
            maxWidth="30rem"
            onClick={onClick}
          >
            <Icon name={selected.icon} mx={1} fontSize={3} />
            <Text whitespce="nowrap" overflow="hidden" textOverflow="ellipsis">
              {selected.name === "Specific people" ? summary : selected.name}
            </Text>
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
            {OPTIONS.map((opt) => (
              <DropdownLineItem key={opt.name}>
                <UnstyledButton
                  onClick={generateClickHandler(opt)}
                  width="100%"
                  alignItems="flex-start"
                  p={1}
                >
                  <Box flexDirection="row" alignItems="center">
                    <Box mr={3}>
                      <Icon name={opt.icon} fontSize={4} />
                    </Box>
                    <Box>
                      <Box flexDirection="row" alignItems="center">
                        <Text fontWeight="semiBold">{opt.name}</Text>
                      </Box>
                      <Box>
                        <Paragraph fontSize={1} mb={0}>
                          {opt.description}
                        </Paragraph>
                      </Box>
                    </Box>
                  </Box>
                </UnstyledButton>
              </DropdownLineItem>
            ))}
          </DropdownItemsContainer>
        )}
      </Dropdown>
      <PersonPicker
        isOpen={isPickerOpen}
        setIsOpen={setIsPickerOpen}
        members={members}
        setMembers={setMembers}
        headingText="Specific people"
      />
    </React.Fragment>
  );
}
