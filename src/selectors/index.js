export function getEmailError(store) {
  return (store.errors.auth && store.errors.auth.email) || "";
}

export function getPasswordError(store) {
  return (store.errors.auth && store.errors.auth.password) || "";
}

export function getGeneralError(store) {
  return (store.errors.auth && store.errors.auth.message) || "";
}

export function getIsLoggedIn(store) {
  return Boolean(store.user);
}

export function getIsLoading(store) {
  return store.loading.global;
}
