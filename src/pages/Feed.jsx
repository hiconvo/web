import React from "react";

import { getUser } from "../selectors";
import { useSelectors } from "../redux";

import { ContainerDualSidebars } from "./styles";
import FeedViewer from "../components/FeedViewer";
import UpcomingEventsSidebar from "../components/UpcomingEventsSidebar";
import ContactInfoBox from "../components/ContactInfoBox";

export default function Feed() {
  const [user] = useSelectors(getUser);

  return (
    <ContainerDualSidebars>
      <UpcomingEventsSidebar />
      <FeedViewer />
      <ContactInfoBox contact={user} />
    </ContainerDualSidebars>
  );
}
