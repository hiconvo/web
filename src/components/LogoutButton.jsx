import React from "react";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";
import { Button } from "./styles";

export default function LogoutButton() {
  // eslint-disable-next-line no-unused-vars
  const [_, { logoutUser }] = useRedux([], unboundActions);

  function handleLogout(e) {
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
