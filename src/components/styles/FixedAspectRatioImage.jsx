import React from "react";
import styled from "styled-components";

const BlockSpreader = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightGray};
  overflow: hidden;
  &:before {
    display: block;
    content: "";
    width: 100%;
    padding-top: ${(props) => (props.xHeight / props.xWidth) * 100}%;
  }
`;

const BlockSetter = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Image = styled.img`
  transition: 0.2s ease opacity;
  object-fit: cover;
  width: 100%;
  height: 100%;
  display: block;
`;

export default function FixedAspectRatioImage(props) {
  return (
    <BlockSpreader
      xHeight={props.height}
      xWidth={props.width}
      circle={props.circle}
    >
      <BlockSetter>
        <Image src={props.src} cover alt={props.alt} circle={props.circle} />
      </BlockSetter>
    </BlockSpreader>
  );
}
