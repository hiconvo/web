import { createSelector } from "reselect";

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

export function getThreads(store) {
  return store.threads;
}

export const getThreadsCount = createSelector(
  getThreads,
  res => res.length
);

export function getSelectedThread(store) {
  const { selectedThreadId } = store;
  return store.threads.find(thread => thread.id === selectedThreadId) || {};
}

export function getMessagesBySelectedThread(store) {
  const { selectedThreadId } = store;
  return store.messages.filter(
    message => message.threadId === selectedThreadId
  );
}
