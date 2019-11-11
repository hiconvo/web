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

const EDITOR_KEYS = ["body", "description"];

export function createOrRecoverInitFormVals(formId, defaultVals) {
  if (!formId) {
    return defaultVals;
  }

  let dat;
  try {
    dat = localStorage.getItem(formId);
  } catch (e) {
    return defaultVals;
  }

  if (!dat) {
    return defaultVals;
  }

  try {
    const recovered = JSON.parse(dat, (key, val) => {
      if (EDITOR_KEYS.includes(key)) {
        try {
          return getInitialEditorState(val);
        } catch (e) {
          return getInitialEditorState();
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
  if (!formId) {
    return;
  }

  // Check if the entry should be removed from localStorage
  try {
    // If this throws an error, then values is invalid
    // so give up
    if (Object.keys(values).length <= 0) {
      return localStorage.removeItem(formId);
    }

    // Check to see if there's anything worth saving
    const nonEmptyVals = Object.entries(values).filter(([key, val]) => {
      if (EDITOR_KEYS.includes(key) && typeof val === "object") {
        try {
          // It's redundant that we have to call this again below
          // but there doesn't see to be a way to avoid it that isn't
          // risky
          return getTextFromEditorState(val).length > 0;
        } catch (e) {
          return false;
        }
      }

      return val.length > 0;
    });

    if (nonEmptyVals.length <= 0) {
      return localStorage.removeItem(formId);
    }
  } catch (e) {
    return;
  }

  // Serialize the data and handle annoying editorState
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
