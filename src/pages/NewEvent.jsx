import React from "react";
import { useRouteMatch } from "react-router";

import { ContainerSidebarLeft } from "./styles";
import InboxSidebar from "../components/InboxSidebar";
import EventForm from "../components/EventForm";

export default function NewEvent() {
  const isEditing = useRouteMatch("/events/edit");

  return (
    <ContainerSidebarLeft>
      <InboxSidebar />
      <EventForm key={isEditing ? "update" : "create"} />
    </ContainerSidebarLeft>
  );
}
