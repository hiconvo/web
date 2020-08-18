import React, { useEffect } from "react";

import { useActions, useSelectors } from "../redux";
import { fetchEvents } from "../actions/events";
import { fetchThreads } from "../actions/threads";
import { fetchContacts } from "../actions/contacts";
import { fetchNotes } from "../actions/notes";
import {
  getIsLoggedIn,
  getIsEventsFetched,
  getIsThreadsFetched,
  getIsContactsFetched,
  getIsNotesFetched
} from "../selectors";

const isFetching = new Set();

export default function DataLoader({ children }) {
  const actions = useActions({
    fetchThreads,
    fetchEvents,
    fetchContacts,
    fetchNotes
  });
  const [
    isLoggedIn,
    isThreadsFetched,
    isEventsFetched,
    isContactsFetched,
    isNotesFetched
  ] = useSelectors(
    getIsLoggedIn,
    getIsThreadsFetched,
    getIsEventsFetched,
    getIsContactsFetched,
    getIsNotesFetched
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

      if (!isNotesFetched) {
        handleFetch("notes", actions.fetchNotes);
      }
    }
  }, [
    isLoggedIn,
    isThreadsFetched,
    isEventsFetched,
    isContactsFetched,
    isNotesFetched,
    actions.fetchThreads,
    actions.fetchEvents,
    actions.fetchContacts,
    actions.fetchNotes
  ]);

  return <React.Fragment>{children}</React.Fragment>;
}
