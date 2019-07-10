import React from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { Button, Text } from "./styles";

export default function LogoutButton() {
  const { logoutUser } = useActions(unboundActions);

  return (
    <Button variant="tertiary" width="100%" onClick={logoutUser}>
      <Text textAlign="left" width="100%" color="inherit">
        Logout
      </Text>
    </Button>
  );
}
