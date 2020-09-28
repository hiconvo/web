import React, { useState } from "react";
import "styled-components/macro";
import css from "@styled-system/css";

import { Box, Icon, Button, Text, LinkButton } from "../components/styles";

function TagContainer({ children, ...rest }) {
  return (
    <Box
      css={css({
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        marginRight: 2,
        marginTop: 1,
        marginBottom: 1,
        backgroundColor: "veryLightGray",
        borderRadius: "normal",
        color: "darkGray",
        fontSize: 1,
        "&:hover": {
          backgroundColor: "lightGray",
          color: "trueBlack"
        }
      })}
      {...rest}
    >
      {children}
    </Box>
  );
}

function AddTagButton({ onAddTag }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tagName, setTagName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddTag(tagName);
    setIsEditing(false);
    setTagName("");
  }

  return (
    <TagContainer>
      <Icon name="add" mr={2} />
      {isEditing ? (
        <Box as="form" onSubmit={handleSubmit} mr={2}>
          <input
            type="text"
            placeholder="Type a name and press enter"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            autoFocus
          />
        </Box>
      ) : (
        <Button
          variant="tertiary"
          padding={0}
          mb={0}
          onClick={() => setIsEditing(true)}
        >
          <Text fontSize={1}>Add Tag</Text>
        </Button>
      )}
    </TagContainer>
  );
}

function TagButton({ tag, onRemoveTag }) {
  return (
    <TagContainer>
      <Icon name="local_offer" mr={2} />
      <LinkButton
        to={`/links/tags?tag=${encodeURIComponent(tag)}`}
        mr={2}
        variant="tertiary"
        padding={0}
        mb={0}
        fontSize={1}
      >
        {tag}
      </LinkButton>
      <Button onClick={() => onRemoveTag(tag)} p={0} variant="tertiary" mb={0}>
        <Icon name="close" />
      </Button>
    </TagContainer>
  );
}

export default function TaggingEditor({ tags, setTags }) {
  function handleAddTag(tag) {
    setTags(tags.concat(tag));
  }

  function handleRemoveTag(tag) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <Box>
      <Box as="ul" flexDirection="row" flexWrap="wrap">
        <li>
          <AddTagButton onAddTag={handleAddTag} />
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <TagButton tag={tag} onRemoveTag={handleRemoveTag} />
          </li>
        ))}
      </Box>
    </Box>
  );
}
