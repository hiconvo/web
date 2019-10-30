import React, { useEffect } from "react";
import stream from "getstream";

import { useSelectors } from "../redux";
import { getUser } from "../selectors";

let client, feed, subscription;

export default function RealtimeNotifications() {
  const [user] = useSelectors(getUser);
  const realtimeToken = user && user.realtimeToken;

  useEffect(() => {
    if (realtimeToken && !(client || feed || subscription)) {
      client = stream.connect("kqm59q4584ah", null, "62737");
      feed = client.feed("notification", user.id, realtimeToken);

      feed.get().then(data => console.log(data));

      subscription = feed
        .subscribe(data => console.log(data))
        .then(
          () => console.log("listening..."),
          e => console.log("not listening: ", e)
        );
    }
  }, [realtimeToken]);

  return <div />;
}
