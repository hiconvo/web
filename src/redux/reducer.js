import { isBefore } from "date-fns";

export const initialState = {
  loading: {
    global: true,
    auth: false
  },
  errors: {
    global: null,
    auth: null
  },
  user: null,
  selectedThreadId: null,
  threads: [],
  messages: [],
  contacts: []
};

export default function reducer(state, action) {
  switch (action.type) {
    case "RECEIVE_USER":
      return Object.assign({}, state, {
        user: action.payload,
        loading: {
          global: false,
          auth: false
        }
      });
    case "RECEIVE_THREADS": {
      const threads = state.threads
        .concat(action.payload)
        .sort(
          (a, b) =>
            a.preview &&
            b.preview &&
            isBefore(a.preview.timestamp, b.preview.timestamp)
        );
      return Object.assign({}, state, {
        threads,
        selectedThreadId: state.selectedThreadId
          ? state.selectedThreadId
          : threads.length > 0 && threads[0].id,
        loading: {
          global: false,
          threads: false
        }
      });
    }
    case "RECEIVE_MESSAGES": {
      const messages = action.payload
        ? state.messages
            .concat(action.payload)
            .sort((a, b) => isBefore(a.timestamp, b.timestamp))
        : state.messages;
      return Object.assign({}, state, {
        messages,
        loading: {
          global: false,
          messages: false
        }
      });
    }
    case "RECEIVE_SELECTED_THREAD":
      return Object.assign({}, state, {
        selectedThreadId: action.payload
      });
    case "RECEIVE_AUTH_ERROR":
      return Object.assign({}, state, {
        errors: { auth: action.payload },
        loading: {
          global: false,
          auth: false
        }
      });
    case "RECEIVE_GLOBAL_ERROR":
      return Object.assign({}, state, {
        errors: { global: action.payload },
        loading: {
          global: false
        }
      });
    case "LOGOUT":
      return Object.assign({}, initialState, {
        errors: state.errors,
        loading: {
          global: false,
          auth: false
        }
      });
    case "RECEIVE_LOADING_STATE":
      return Object.assign({}, state, { ...state.loading, ...action.payload });
    default:
      return state;
  }
}
