import React from "react";

import FeedViewer from "../components/FeedViewer";
import UpcomingEventsSidebar from "../components/UpcomingEventsSidebar";
import ContactsSidebar from "../components/ContactsSidebar";
import { ContainerDualSidebars } from "./styles";
import { Box } from "../components/styles";

export default function Feed() {
  return (
    <ContainerDualSidebars collapse="left">
      <Box>
        <Box position="fixed" width="28rem">
          <UpcomingEventsSidebar />
        </Box>
      </Box>
      <FeedViewer />
      <Box>
        <Box position="fixed" width="28rem">
          <ContactsSidebar />
        </Box>
      </Box>
    </ContainerDualSidebars>
  );
}
