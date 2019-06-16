export function getEmailError(store) {
  return (store.errors.auth && store.errors.auth.email) || "";
}

export function getPasswordError(store) {
  return (store.errors.auth && store.errors.auth.password) || "";
}

export function getFirstNameError(store) {
  return (store.errors.auth && store.errors.auth.firstName) || "";
}

export function getLastNameError(store) {
  return (store.errors.auth && store.errors.auth.lastName) || "";
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

export function getAuthErrors(store) {
  const authErrors = store.errors.auth || {};
  // Massage errors into empty strings when they are undefined
  return Object.keys(authErrors).reduce((result, key) => {
    result[key] = authErrors[key] || "";
    return result;
  }, {});
}
