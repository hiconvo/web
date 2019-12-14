import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import { getSelectedResource, getIsThreadsFetched } from "../selectors";
import * as unboundGeneralActions from "../actions/general";
import * as unboundThreadActions from "../actions/threads";
import { ContainerDualSidebars } from "./styles";
import ThreadViewer from "../components/ThreadViewer";
import ResourceInfoBox from "../components/ResourceInfoBox";

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
  const { setSelectedResource } = useActions(unboundGeneralActions);
  const { fetchThreads } = useActions(unboundThreadActions);
  const [resource, isThreadsFetched] = useSelectors(
    getSelectedResource,
    getIsThreadsFetched
  );
  const { id } = useParams();

  const _setSelectedResource = useCallback(setSelectedResource);

  useEffect(() => {
    if (id !== resource.id) {
      _setSelectedResource(id);
    }
  }, [id, resource.id, _setSelectedResource]);

  useEffect(() => {
    !isThreadsFetched && fetchThreads();
  }, [isThreadsFetched, fetchThreads]);

  return (
    <ContainerDualSidebars>
      <div />
      <Container>
        <ThreadViewer thread={resource} />
      </Container>
      <ResourceInfoBox />
    </ContainerDualSidebars>
  );
}
