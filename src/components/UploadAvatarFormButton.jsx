import React, { useState, useRef } from "react";
import Modal from "styled-react-modal";
import Cropper from "react-image-crop";
import { themeGet } from "@styled-system/theme-get";
import imageFileToBase64 from "image-file-to-base64-exif";

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

    // Handle cropping when image is condensed on a small screen
    const imgEl = document.querySelector(".ReactCrop__image");
    const width = imgEl.clientWidth;
    const naturalWidth = imgEl.naturalWidth;
    const scalingFactor = naturalWidth > width ? naturalWidth / width : 1;

    try {
      await uploadAvatar({
        blob: src.split(",").pop(),
        x: crop.x * scalingFactor,
        y: crop.y * scalingFactor,
        size: crop.width * scalingFactor
      });
    } catch {
      setIsLoading(false);
    }

    setIsLoading(false);
    setIsOpen(false);
  }

  async function handleFileSelection(e) {
    const [file] = e.target.files;
    const src = await imageFileToBase64(file, 700, 700, 85);
    setSrc(src);
    setIsOpen(true);
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
        <Cropper src={src} crop={crop} onChange={setCrop} circularCrop />
        <Box flexDirection="row" justifyContent="center" pt={2}>
          <Button
            variant="secondary"
            width="10rem"
            onClick={() => setIsOpen(false)}
            mr={2}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            isLoading={isLoading}
            width="10rem"
          >
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
