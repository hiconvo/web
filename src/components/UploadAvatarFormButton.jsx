import React, { useState, useRef } from "react";
import Modal from "styled-react-modal";
import Cropper from "react-image-crop";
import { themeGet } from "@styled-system/theme-get";

import { useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { Button, Box, Icon, Text } from "./styles";

const StyledModal = Modal.styled`
  width: auto;
  max-width: 80rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.special")};
  box-shadow: ${themeGet("shadows.spread")};
  padding-top: ${themeGet("space.4")};
  padding-right: ${themeGet("space.4")};
  padding-left: ${themeGet("space.4")};
  padding-bottom: ${themeGet("space.2")};
  margin: ${themeGet("space.4")};
`;

export default function UploadAvatarFormButton() {
  const inputEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({
    aspect: 1,
    x: 10,
    y: 10,
    width: 100,
    height: 100
  });
  const { uploadAvatar } = useActions(unboundActions);

  async function handleUpload(e) {
    e.preventDefault();

    setIsLoading(true);

    await uploadAvatar({
      blob: src,
      x: crop.x,
      y: crop.y,
      size: crop.width
    });

    setIsLoading(false);
    setIsOpen(false);
  }

  function handleFileSelection(e) {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setSrc(reader.result);
        setIsOpen(true);
      },
      false
    );
    reader.readAsDataURL(file);
  }

  function handleClick(e) {
    e.preventDefault();
    inputEl.current && inputEl.current.click();
  }

  return (
    <React.Fragment>
      <Button
        variant="tertiary"
        onClick={handleClick}
        width="min-content"
        mb="0"
        p="0"
      >
        <Icon name="add_a_photo" fontSize={4} mr={2} />
        <Text color="inherit">Upload new avatar</Text>
      </Button>
      <StyledModal isOpen={isOpen}>
        <Cropper
          src={src}
          crop={crop}
          onChange={setCrop}
          keepSelection
          circularCrop
        />
        <Box flexDirection="row" justifyContent="center" pt={2}>
          <Button
            variant="secondary"
            width="10rem"
            onClick={() => setIsOpen(false)}
            mr={2}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} isLoading={isLoading} width="10rem">
            Done
          </Button>
        </Box>
      </StyledModal>
      <input
        type="file"
        name="avatar"
        accept="image/*"
        onChange={handleFileSelection}
        style={{ display: "none" }}
        ref={inputEl}
      />
    </React.Fragment>
  );
}
