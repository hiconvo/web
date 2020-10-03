import React from "react";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import { Text, Box, LinkButton, DropdownMenu } from "../components/styles";
import { upperFirstLetter } from "../utils";

export default function LinkFilterMenu({ isOpen, isVisible, onClose }) {
  const [user] = useSelectors(getUser);

  function handleClick() {
    onClose();
  }

  return (
    <DropdownMenu
      isOpen={isOpen}
      isVisible={isVisible}
      px="1.4rem"
      pt="0.8rem"
      width="16rem"
      onClick={handleClick}
    >
      <Box as="ul" mb={2}>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links/?filter=note"
          >
            Notes
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links/?filter=link"
          >
            Links
          </LinkButton>
        </li>
        <li>
          <LinkButton
            variant="tertiary"
            textAlign="left"
            justifyContent="flex-start"
            p={2}
            to="/links"
          >
            Remove Filter
          </LinkButton>
        </li>

        {user.tags.length > 0 && (
          <Box px={2} py={1}>
            <Text fontSize={1} color="gray">
              Tags
            </Text>
          </Box>
        )}

        {user.tags.map((tag) => (
          <li key={tag}>
            <LinkButton
              variant="tertiary"
              textAlign="left"
              justifyContent="flex-start"
              px={2}
              py={1}
              to={`/links/tags?tag=${encodeURIComponent(tag)}`}
            >
              {upperFirstLetter(tag)}
            </LinkButton>
          </li>
        ))}

        {user.tags.length > 0 && <Box py={1} />}
      </Box>
    </DropdownMenu>
  );
}
