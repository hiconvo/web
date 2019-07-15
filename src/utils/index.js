export function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export const errorToString = e => {
  const errorPayload = e.getPayload && e.getPayload();
  if (errorPayload) {
    if (errorPayload.message) return errorPayload.message;
    return Object.values(errorPayload).join(", ");
  }

  const message = e.message;
  if (message) return message;

  return e.toString();
};
