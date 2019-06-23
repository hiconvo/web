import React, { useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { useSelectors, useActions } from "../redux";
import {
  getSelectedThread,
  getMessagesBySelectedThread,
  getUser
} from "../selectors";
import * as unboundActions from "../actions/messages";
import Message from "./Message";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};
`;

export default function Viewer() {
  const [{ id }, messages, user] = useSelectors(
    getSelectedThread,
    getMessagesBySelectedThread,
    getUser
  );
  const { fetchMessages } = useActions(unboundActions);

  useEffect(() => {
    id && messages.length === 0 && fetchMessages(id);
  }, [id, messages.length, fetchMessages]);

  return (
    <Container>
      {messages.map(message => (
        <Message
          key={message.id}
          message={message}
          isAuthor={user.id === message.user.id}
        />
      ))}
    </Container>
  );
}
