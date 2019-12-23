import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import { getIsThreadsFetched } from "../selectors";
import * as unboundThreadActions from "../actions/threads";
import { ContainerRightSidebar } from "./styles";
import ThreadViewer from "../components/ThreadViewer";
import ThreadInfoBox from "../components/ThreadInfoBox";

const Container = styled.main`
  display: block;
  padding-right: ${themeGet("space.5")};
  padding-left: 0;

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function Thread() {
  const { fetchThreads } = useActions(unboundThreadActions);
  const [isThreadsFetched] = useSelectors(getIsThreadsFetched);

  useEffect(() => {
    !isThreadsFetched && fetchThreads();
  }, [isThreadsFetched, fetchThreads]);

  return (
    <ContainerRightSidebar>
      <Container>
        <ThreadViewer />
      </Container>
      <ThreadInfoBox />
    </ContainerRightSidebar>
  );
}
