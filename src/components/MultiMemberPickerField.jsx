import React, { useState } from "react";

import MemberItemSmallInline from "./MemberItemSmallInline";
import PersonPicker from "./PersonPicker";
import { Box, Button, Icon } from "./styles";

export default function MultiMemberPickerField({ members, setMembers, tabIndex, headingText = "Edit guests" }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  function handleOpenPicker(e) {
    e && e.preventDefault() && e.stopPropagation();
    setIsPickerOpen(true);
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
    <Box flexDirection="row">
      <Box as="ul" flexDirection="row" alignItems="center" flexWrap="wrap">
        {members.map(member => (
          <MemberItemSmallInline
            key={member.id}
            member={member}
            onDelete={handleRemoveMember(member)}
          />
        ))}
        <Box as="li">
          <Button
            variant="primary"
            p={2}
            mb={0}
            m={1}
            onClick={handleOpenPicker}
            tabIndex={tabIndex}
          >
            <Icon name="edit" fontSize={3} mr={1} />
            <span>{headingText}</span>
          </Button>
        </Box>
      </Box>
      <PersonPicker
        isOpen={isPickerOpen}
        setIsOpen={setIsPickerOpen}
        members={members}
        setMembers={setMembers}
        headingText={headingText}
      />
    </Box>
  );
}
