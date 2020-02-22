import React from "react";

import { useActions } from "../redux";
import * as unboundActions from "../actions/auth";
import { Ripple, CenterContent } from "../components/styles";

let isInFlight = false;

export default function Magic({ match, history }) {
  const { key, timestamp, signature } = match.params;
  const { magicLogin } = useActions(unboundActions);

  async function handleLogin() {
    if (isInFlight) return;

    isInFlight = true;

    try {
      await magicLogin({ userId: key, timestamp, signature });
    } catch (e) {
    } finally {
      history.push(`/convos`);
    }
  }

  handleLogin();

  return (
    <CenterContent>
      <Ripple />
    </CenterContent>
  );
}
