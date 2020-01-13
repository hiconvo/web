import React, { useEffect } from "react";

import { useActions, useSelectors } from "../redux";
import { fetchEvents } from "../actions/events";
import { fetchThreads } from "../actions/threads";
import { fetchContacts } from "../actions/contacts";
import {
  getIsLoggedIn,
  getIsEventsFetched,
  getIsThreadsFetched,
  getIsContactsFetched
} from "../selectors";

const isFetching = new Set();

export default function DataLoader({ children }) {
  const actions = useActions({ fetchThreads, fetchEvents, fetchContacts });
  const [
    isLoggedIn,
    isThreadsFetched,
    isEventsFetched,
    isContactsFetched
  ] = useSelectors(
    getIsLoggedIn,
    getIsThreadsFetched,
    getIsEventsFetched,
    getIsContactsFetched
  );

  async function handleFetch(name, fetcher) {
    if (!isFetching.has(name)) {
      isFetching.add(name);
      await fetcher();
      isFetching.delete(name);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (!isThreadsFetched) {
        handleFetch("threads", actions.fetchThreads);
      }

      if (!isEventsFetched) {
        handleFetch("events", actions.fetchEvents);
      }

      if (!isContactsFetched) {
        handleFetch("contacts", actions.fetchContacts);
      }
    }
  }, [
    isLoggedIn,
    isThreadsFetched,
    isEventsFetched,
    isContactsFetched,
    actions.fetchThreads,
    actions.fetchEvents,
    actions.fetchContacts
  ]);

  return <React.Fragment>{children}</React.Fragment>;
}
