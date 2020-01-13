import React, { useEffect } from "react";

import { useActions, useSelectors } from "../redux";
import { getIsLoggedIn } from "../selectors";

const hasBeenFetched = [];

export default function DataLoader({ children, initialActions = {} }) {
  const actions = useActions(initialActions);
  const [isLoggedIn] = useSelectors(getIsLoggedIn);

  useEffect(() => {
    Object.entries(actions).forEach(([name, action]) => {
      if (isLoggedIn && !hasBeenFetched.includes(name)) {
        action();
        hasBeenFetched.push(name);
      }
    });
  }, [isLoggedIn, actions]);

  return <React.Fragment>{children}</React.Fragment>;
}
