import { useEffect } from "react";

import { useActions, useSelectors } from "../redux";
import { getUser } from "../selectors";
import * as eventActions from "../actions/events";
import * as threadActions from "../actions/threads";

export default function useReadReporting(resource = {}) {
  const { id, resourceType, reads } = resource;

  const [user] = useSelectors(getUser);
  const { markEventAsRead } = useActions(eventActions);
  const { markThreadAsRead } = useActions(threadActions);

  const hasRead = reads && reads.some(r => r.id === user.id);

  useEffect(() => {
    if (!hasRead) {
      switch (resourceType) {
        case "Event":
          markEventAsRead({ id });
          break;
        case "Thread":
          markThreadAsRead({ id });
          break;
        default:
          break;
      }
    }
  }, [id, resourceType, hasRead, markThreadAsRead, markEventAsRead]);
}
