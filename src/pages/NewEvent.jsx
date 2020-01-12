import React from "react";
import { useRouteMatch, useParams } from "react-router";
import styled from "styled-components";

import { useSelectors } from "../redux";
import { getEventById } from "../selectors";
import { baseLayout } from "./styles";
import EventForm from "../components/EventForm";
import { Ripple, CenterContent } from "../components/styles";

const Container = styled.div`
  ${baseLayout}
  max-width: 100rem;
  margin: auto;
`;

export default function NewEvent() {
  const isEditing = useRouteMatch("/events/:id/edit");
  const { id } = useParams();
  const [event] = useSelectors(getEventById(id));

  if (id && !event) {
    return (
      <CenterContent>
        <Ripple />
      </CenterContent>
    );
  }

  return (
    <Container>
      <EventForm event={event || {}} key={isEditing ? "update" : "create"} />
    </Container>
  );
}
