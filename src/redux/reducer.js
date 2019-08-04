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
        .filter(t => !action.payload.some(newThread => newThread.id === t.id))
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
    case "DELETE_THREAD": {
      return Object.assign({}, state, {
        threads: state.threads.filter(t => t.id !== action.payload),
        messages: state.messages.filter(m => m.threadId !== action.payload)
      });
    }
    case "RECEIVE_MESSAGES": {
      if (!action.payload) return state;

      const messages = state.messages
        .concat(action.payload)
        .sort((a, b) => isBefore(a.timestamp, b.timestamp));

      // Update thread previews. Could probably optimize this.
      const threads = state.threads.map(thread => {
        action.payload.forEach(message => {
          if (message.threadId === thread.id) {
            if (
              !thread.preview ||
              isBefore(thread.preview.timestamp, message.timestamp)
            ) {
              thread.preview = message;
            }
          }
        });
        return thread;
      });

      return Object.assign({}, state, {
        messages,
        threads,
        loading: {
          global: false,
          messages: false
        }
      });
    }
    case "RECEIVE_SELECTED_THREAD":
      return Object.assign({}, state, {
        selectedThreadId:
          action.payload || (state.threads.length ? state.threads[0].id : 0)
      });
    case "RECEIVE_CONTACTS":
      return Object.assign({}, state, {
        contacts: action.payload
      });
    case "RECEIVE_CONTACT":
      return Object.assign({}, state, {
        contacts: state.contacts.concat([action.payload])
      });
    case "REMOVE_CONTACT":
      return Object.assign({}, state, {
        contacts: state.contacts.filter(c => c.id !== action.payload.id)
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
