import React from "react";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default function Viewer() {
  return <Container>I am the viewer</Container>;
}
