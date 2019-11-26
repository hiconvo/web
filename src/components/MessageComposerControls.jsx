import React from "react";

import { Box, Button, Text, Icon } from "./styles";

export default function ComposerControls({
  onClick,
  onPhotoClick,
  isDisabled,
  isImgLoading
}) {
  return (
    <Box justifyContent="space-between" alignItems="center" flexDirection="row">
      {!onPhotoClick ? (
        <div />
      ) : (
        <Button
          onClick={onPhotoClick}
          variant="brand"
          color="mediumGray"
          fontSize={1}
          mb="0.5rem"
          p="0"
          isDisabled={isImgLoading || isDisabled}
          isLoading={isImgLoading}
          width="auto"
        >
          <Icon name="add_photo_alternate" fontSize="2.4rem" mr={1} />
          <Text
            color="inherit"
            fontSize="inherit"
            fontWeight="inherit"
            mt="0.2rem"
          >
            Add photo
          </Text>
        </Button>
      )}
      <Button
        onClick={onClick}
        variant="brand"
        color="primary700"
        fontSize={2}
        mb="0"
        p="0"
        py={3}
        disabled={isDisabled}
        isLoading={isDisabled}
        width="auto"
        type="submit"
      >
        <span>Send</span>
        <Icon name="send" ml={1} fontSize="2.0rem" />
      </Button>
    </Box>
  );
}
