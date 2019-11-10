import { format, parse, parseISO } from "date-fns";

import {
  getTextFromEditorState,
  getInitialEditorState
} from "../components/Composer";

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

const DATE_KEYS = ["date", "time"];
const EDITOR_KEYS = ["body", "description"];

export function createOrRecoverInitFormVals(formId, defaultVals) {
  if (!formId) {
    return defaultVals;
  }

  const dat = localStorage.getItem(formId);

  if (!dat) {
    return defaultVals;
  }

  try {
    const recovered = JSON.parse(dat, (key, val) => {
      if (EDITOR_KEYS.includes(key)) {
        try {
          return getInitialEditorState(val);
        } catch (e) {
          return "";
        }
      }

      return val;
    });
    return Object.assign({}, defaultVals, recovered);
  } catch (e) {
    return defaultVals;
  }
}

export function saveUnsubmittedFormVals(formId, values) {
  if (formId) {
    const dat = JSON.stringify(values, (key, val) => {
      if (typeof val !== "string") {
        if (EDITOR_KEYS.includes(key) && typeof val === "object") {
          try {
            return getTextFromEditorState(val);
          } catch (e) {
            return undefined;
          }
        }
      }

      return val;
    });

    localStorage.setItem(formId, dat);
  }
}
