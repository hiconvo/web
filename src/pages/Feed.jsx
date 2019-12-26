import React from "react";

import FeedViewer from "../components/FeedViewer";
import UpcomingEventsSidebar from "../components/UpcomingEventsSidebar";
import ContactsSidebar from "../components/ContactsSidebar";
import { ContainerRightSidebar } from "./styles";
import { Box } from "../components/styles";

export default function Feed() {
  return (
    <ContainerRightSidebar>
      <FeedViewer />
      <Box>
        <Box position="fixed" width="28rem">
          <UpcomingEventsSidebar />
          <ContactsSidebar />
        </Box>
      </Box>
    </ContainerRightSidebar>
  );
}
