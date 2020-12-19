import React from "react";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";
import { Box, Ripple } from "./styles";

export default function CommentsSection({
  messages,
  createMessage,
  threadId,
  eventId,
  isLoading
}) {
  const [user] = useSelectors(getUser);

  if (isLoading) {
    return <Ripple />;
  }

  return (
    <Box>
      {messages && messages.length > 0 && (
        <MessageList
          messages={messages}
          threadId={threadId}
          eventId={eventId}
          user={user}
        />
      )}
      <MessageComposer
        key={threadId || eventId}
        createMessage={createMessage}
        backgroundColor="gray"
        height="8rem"
      />
    </Box>
  );
}
