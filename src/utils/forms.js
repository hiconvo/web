import { format, parse, parseISO } from "date-fns";

function getDate(str, isEditing) {
  let dateArg = new Date();

  if (isEditing && str) {
    dateArg = parseISO(str);
  }

  return dateArg;
}

export function getInitDate(str, isEditing) {
  return format(getDate(str, isEditing), "yyyy-MM-dd");
}

export function getInitTime(str, isEditing) {
  return format(getDate(str, isEditing), "HH:mm");
}

export function getInitVal(val, isEditing, fallback) {
  if (!isEditing || (isEditing && !val)) {
    return fallback;
  }

  return val;
}

export function getISOFromDateTime(date, time) {
  const datetime = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());

  return datetime.toISOString();
}
