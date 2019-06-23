import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors, useActions } from "../redux";
import { getSelectedThread, getMessagesBySelectedThread } from "../selectors";
import * as unboundActions from "../actions/messages";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${themeGet("space.5")};
`;

export default function Viewer() {
  const [{ id }, messages] = useSelectors(
    getSelectedThread,
    getMessagesBySelectedThread
  );
  const { fetchMessages } = useActions(unboundActions);

  useEffect(() => {
    id && messages.length === 0 && fetchMessages(id);
  }, [id, messages.length]);

  return (
    <Container>
      {messages.map(message => (
        <div key={message.id}>{message.body}</div>
      ))}
    </Container>
  );
}
