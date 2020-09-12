import { isBefore as before, parseISO, format } from "date-fns";

export function generateId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const errorToString = (e) => {
  const errorPayload = e.getPayload && e.getPayload();
  if (errorPayload) {
    if (errorPayload.message) return errorPayload.message;
    return Object.values(errorPayload).join(", ");
  }

  const message = e.message;
  if (message) return message;

  return e.toString();
};

export function isMobileDevice() {
  const mobileRegEx = /Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i;

  return mobileRegEx.test(navigator.userAgent);
}

export function isBrowserType(browser) {
  return navigator.userAgent.indexOf(browser) > -1;
}

export function isBefore(a, b) {
  return a && b && before(parseISO(a), parseISO(b)) ? 1 : -1;
}

export function datePartsToString(year, month, date) {
  return `${year}-${(month + 1)
    .toString()
    .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
}

export function isoDateToString(date) {
  const dt = parseISO(date);
  return datePartsToString(dt.getFullYear(), dt.getMonth(), dt.getDate());
}

export function isoDateToNotesHeading(date) {
  const dt = parseISO(date);
  return format(dt, "EEEE d LLLL");
}

export function getGoogleMapsUrl(lat, lng, placeId) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`;
}
