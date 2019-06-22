import React from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { Button } from "./styles";

export default function LogoutButton() {
  const { logoutUser } = useActions(unboundActions);

  function handleLogout() {
    logoutUser();
  }

  return (
    <Button
      variant="tertiary"
      textAlign="left"
      width="100%"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
