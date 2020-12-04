import React from "react";
import { motion } from "framer-motion";
import Message from "./Message";

export default function MessageList({ messages, user, threadId, eventId }) {
  const item = {
    hidden: { opacity: 0 },
    show: (i) => ({ opacity: 1, transition: { delay: i * 0.01 } })
  };

  return (
    <div>
      {messages.map((message, idx) => (
        <motion.div
          key={message.id}
          variants={item}
          custom={idx}
          initial="hidden"
          animate="show"
        >
          <Message
            message={message}
            threadId={threadId}
            eventId={eventId}
            isAuthor={user.id === message.user.id}
          />
        </motion.div>
      ))}
    </div>
  );
}
