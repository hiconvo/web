import React from "react";

import { ContainerDualSidebars } from "./styles";
import InboxSidebar from "../components/InboxSidebar";
import ResourceViewer from "../components/ResourceViewer";
import ResourceInfoBox from "../components/ResourceInfoBox";

export default function Main() {
  return (
    <ContainerDualSidebars>
      <InboxSidebar />
      <ResourceViewer />
      <ResourceInfoBox />
    </ContainerDualSidebars>
  );
}
