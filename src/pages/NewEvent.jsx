import React from "react";
import { useRouteMatch, useParams } from "react-router";

import { useEvents } from "../hooks";
import { getEventById } from "../selectors";
import { ContainerSidebarLeft } from "./styles";
import EventSidebar from "../components/EventSidebar";
import EventForm from "../components/EventForm";
import { Ripple, CenterContent } from "../components/styles";

export default function NewEvent() {
  const isEditing = useRouteMatch("/events/:id/edit");
  const { id } = useParams();
  const [event] = useEvents(getEventById(id));

  if (id && !event) {
    return (
      <CenterContent>
        <Ripple />
      </CenterContent>
    );
  }

  return (
    <ContainerSidebarLeft>
      <EventSidebar />
      <EventForm event={event || {}} key={isEditing ? "update" : "create"} />
    </ContainerSidebarLeft>
  );
}
