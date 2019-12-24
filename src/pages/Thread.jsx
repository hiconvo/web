import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { ContainerRightSidebar } from "./styles";
import ThreadViewer from "../components/ThreadViewer";
import ThreadInfoBox from "../components/ThreadInfoBox";
import { Box } from "../components/styles";

const Container = styled.main`
  display: block;
  padding-right: ${themeGet("space.5")};
  padding-left: 0;

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function Thread() {
  return (
    <ContainerRightSidebar>
      <Container>
        <ThreadViewer />
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <ThreadInfoBox />
        </Box>
      </Box>
    </ContainerRightSidebar>
  );
}
