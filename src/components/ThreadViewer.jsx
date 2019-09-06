import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useSelectors, useActions } from "../redux";
import {
  getSelectedResource,
  getMessagesBySelectedThread,
  getUser
} from "../selectors";
import * as unboundActions from "../actions/messages";
import Message from "./Message";
import MessageComposer from "./MessageComposer";
import { Ripple } from "./styles";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export default function ThreadViewer() {
  const [isLoading, setIsLoading] = useState(false);
  const [{ id }, messages, user] = useSelectors(
    getSelectedResource,
    getMessagesBySelectedThread,
    getUser
  );
  const { fetchMessages } = useActions(unboundActions);

  useEffect(() => {
    async function handleFetchMessages() {
      setIsLoading(true);
      await fetchMessages(id);
      setIsLoading(false);
    }

    if (id && messages.length === 0) {
      handleFetchMessages();
    }
  }, [id, messages.length, fetchMessages]);

  return (
    <Container>
      <MessageComposer />
      {isLoading && <Ripple />}
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
