import { createSelector } from "reselect";

import { isBefore } from "../utils";

export function getGeneralError(store) {
  return (store.errors.auth && store.errors.auth.message) || "";
}

export function getIsLoggedIn(store) {
  return Boolean(store.user);
}

export function getIsLoading(store) {
  return store.loading.global;
}

export function getAuthErrors(store) {
  const authErrors = store.errors.auth || {};
  // Massage errors into empty strings when they are undefined
  return Object.keys(authErrors).reduce((result, key) => {
    result[key] = authErrors[key] || "";
    return result;
  }, {});
}

export function getUser(store) {
  return store.user;
}

export function getThreads(store) {
  return store.threads;
}

export const getThreadsCount = createSelector(
  getThreads,
  res => res.length
);

export function getMessagesByThreadId(id) {
  return store => store.messages.filter(message => message.parentId === id);
}

export function getMessagesBySelectedThread(store) {
  const { selectedResourceId } = store;
  return getMessagesByThreadId(selectedResourceId)(store);
}

export function getEvents(store) {
  return store.events;
}

export const getEventsCount = createSelector(
  getEvents,
  res => res.length
);

export const getInboxContents = createSelector(
  getThreads,
  getEvents,
  (threads, events) => {
    return [].concat(threads, events).sort((a, b) => {
      const aTime = a.preview ? a.preview.timestamp : a.timestamp;
      const bTime = b.preview ? b.preview.timestamp : b.timestamp;
      return isBefore(aTime, bTime);
    });
  }
);

export function getSelectedResourceId(store) {
  return store.selectedResourceId;
}

export const getSelectedResource = createSelector(
  getSelectedResourceId,
  getInboxContents,
  (selectedResourceId, resources) =>
    resources.find(resource => resource.id === selectedResourceId) || {}
);

export const getIsOwnerOfSelectedResource = createSelector(
  getSelectedResource,
  getUser,
  (resource, user) =>
    user && resource && resource.owner && user.id === resource.owner.id
);

export function getContacts(store) {
  return store.contacts;
}

export function getIsContactsFetched(store) {
  return store.isContactsFetched;
}

export function getIsThreadsFetched(store) {
  return store.isThreadsFetched;
}

export function getIsEventsFetched(store) {
  return store.isEventsFetched;
}
