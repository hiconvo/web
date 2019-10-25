import React from "react";

import { ContainerSidebarLeft } from "./styles";
import InboxSidebar from "../components/InboxSidebar";
import EventForm from "../components/EventForm";

export default function NewEvent() {
  return (
    <ContainerSidebarLeft>
      <InboxSidebar />
      <EventForm />
    </ContainerSidebarLeft>
  );
}
