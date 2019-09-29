import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors } from "../redux";
import { getSelectedResource } from "../selectors";

import ThreadViewer from "./ThreadViewer";
import EventViewer from "./EventViewer";
import { Ripple, CenterContent } from "./styles";

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

function Content({ resource }) {
  switch (resource.resourceType) {
    case "Event":
      return <EventViewer event={resource} />;
    case "Thread":
      return <ThreadViewer thread={resource} />;
    default:
      return (
        <CenterContent>
          <Ripple />
        </CenterContent>
      );
  }
}

export default function ResourceViewer() {
  const [resource] = useSelectors(getSelectedResource);

  return (
    <Container>
      <Content resource={resource} />
    </Container>
  );
}
