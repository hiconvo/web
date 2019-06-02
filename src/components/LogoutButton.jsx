import React from "react";

import { useRedux } from "../redux";
import * as unboundActions from "../actions/auth";

export default function LogoutButton() {
  // eslint-disable-next-line no-unused-vars
  const [_, { logoutUser }] = useRedux([], unboundActions);

  function handleLogout(e) {
    logoutUser();
  }

  return <a onClick={handleLogout}>Logout</a>;
}
