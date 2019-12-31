import React from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useThreads } from "../hooks";
import { getThreadById } from "../selectors";
import { ContainerDualSidebars } from "./styles";
import ThreadViewer from "../components/ThreadViewer";
import ThreadInfoBox from "../components/ThreadInfoBox";
import { Box, Ripple, CenterContent, Button, Icon } from "../components/styles";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function Thread() {
  const history = useHistory();
  const { id } = useParams();
  const [thread] = useThreads(getThreadById(id));

  if (!thread) {
    return (
      <CenterContent>
        <Ripple />
      </CenterContent>
    );
  }

  return (
    <ContainerDualSidebars>
      <Box>
        <Box position="fixed" width="28rem">
          <Button onClick={() => history.goBack()} variant="gray" width="100%">
            <Icon name="keyboard_backspace" mr={1} fontSize={3} />
            Go back
          </Button>
        </Box>
      </Box>
      <Container>
        <ThreadViewer thread={thread} />
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <ThreadInfoBox thread={thread} />
        </Box>
      </Box>
    </ContainerDualSidebars>
  );
}
