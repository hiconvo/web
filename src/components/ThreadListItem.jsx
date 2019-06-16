import React from "react";

import { Text } from "./styles";

export default function ThreadListItem({ thread }) {
  return (
    <li>
      <div>
        {thread.users.map(user => (
          <Text>{user.firstName}</Text>
        ))}
      </div>
      <div>
        <Text>{thread.subject}</Text>
      </div>
    </li>
  );
}
