import { useEffect } from "react";

import { useSelectors, useActions } from "../redux";
import { getIsEventsFetched, getEvents } from "../selectors";
import * as unboundEventActions from "../actions/events";

export default function useEvents(...selectors) {
  const [isEventsFetched] = useSelectors(getIsEventsFetched);
  const { fetchEvents } = useActions(unboundEventActions);

  useEffect(() => {
    !isEventsFetched && fetchEvents();
  }, [isEventsFetched, fetchEvents]);

  return useSelectors(...(selectors.length <= 0 ? [getEvents] : selectors));
}
