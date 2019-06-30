import React from "react";
import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const skBounce = keyframes`
  0%, 100% { 
    transform: scale(0.0);
  }
  50% { 
    transform: scale(1.0);
  }
`;

const Container = styled.div`
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
`;

const Bounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${themeGet("colors.lightGray")};
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: ${skBounce} 2s infinite ease-in-out;
`;

const Bounce2 = styled(Bounce1)`
  animation-delay: -1s;
`;

export default function Ripple() {
  return (
    <Container>
      <Bounce1 />
      <Bounce2 />
    </Container>
  );
}
