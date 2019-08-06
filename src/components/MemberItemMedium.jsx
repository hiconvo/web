import React from "react";
import styled from "styled-components";
import { margin } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

import { Text, Box, Icon, Avatar, Dropdown, UnstyledButton } from "./styles";
import ContactInfoBox from "./ContactInfoBox";

const DeleteButton = styled.button`
  background: inherit;
  border: none;
  visibility: hidden;
`;

const Container = styled.li`
  ${margin}
  display: flex;
  align-items: center;
  width: max-content;
  border-radius: ${themeGet("radii.special")};
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  background-color: transparent;
  transition: background-color ease ${themeGet("animations.fast")};

  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};

    ${DeleteButton} {
      visibility: visible;
    }
  }
`;

const InfoBoxContainer = styled.div`
  padding: ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;

  display: ${props => (props.isOpen ? "flex" : "none")};

  ${themeGet("media.phone")} {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100vw - ${themeGet("space.4")} * 2);
    height: 100vh;
  }
`;

const CloseButton = styled.div`
  display: none;

  ${themeGet("media.phone")} {
    display: block;
    position: fixed;
    right: 2rem;
    top: 2rem;
    z-index: 40;
  }
`;

const Name = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 21rem;
  overflow: hidden;
`;

export default function MemberItemMedium({ member, onDelete, ...rest }) {
  return (
    <Dropdown
      renderAnchor={({ onClick }) => (
        <Container {...rest}>
          <UnstyledButton position="relative" p={0} onClick={onClick}>
            <Box alignItems="center" flexDirection="row">
              <Avatar src={member.avatar} size="3rem" />
              <Name ml={2} fontSize={3}>
                {member.fullName}
              </Name>
            </Box>
          </UnstyledButton>
          {onDelete && (
            <DeleteButton onClick={onDelete}>
              <Icon name="clear" fontSize={4} display="flex" />
            </DeleteButton>
          )}
        </Container>
      )}
    >
      {({ isOpen, isVisible, handleToggle }) => (
        <InfoBoxContainer isOpen={isOpen} isVisible={isVisible}>
          <CloseButton>
            <Icon onClick={handleToggle} name="close" fontSize={5} />
          </CloseButton>
          <ContactInfoBox position="static" contact={member} />
        </InfoBoxContainer>
      )}
    </Dropdown>
  );
}
