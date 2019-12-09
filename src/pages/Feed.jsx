import React from "react";

import { ContainerDualSidebars } from "./styles";
import FeedViewer from "../components/FeedViewer";
import UpcomingEventsSidebar from "../components/UpcomingEventsSidebar";
import ContactInfoBox from "../components/ContactInfoBox";

export default function Feed() {
  return (
    <ContainerDualSidebars>
      <UpcomingEventsSidebar />
      <FeedViewer />
      <ContactInfoBox />
    </ContainerDualSidebars>
  );
}
