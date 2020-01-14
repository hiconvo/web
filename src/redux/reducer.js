import { isBefore } from "../utils";

export const initialState = {
  loading: { global: true },
  user: null,
  selectedResourceId: null,
  threads: [],
  events: [],
  messages: [],
  contacts: [],
  isContactsFetched: false,
  isThreadsFetched: false,
  isEventsFetched: false,
  threadsPageNum: 0,
  eventsPageNum: 0,
  isThreadsExhausted: false,
  isEventsExhausted: false
};

export default function reducer(state, action) {
  switch (action.type) {
    case "RECEIVE_USER":
      return Object.assign({}, state, {
        user: action.payload,
        loading: { global: false }
      });
    case "RECEIVE_MISMATCHED_USER":
      return Object.assign({}, initialState, {
        user: action.payload,
        loading: { global: false }
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
        )
        .map(thread => ({
          ...thread,
          resourceType: "Thread",
          preview: {
            ...thread.preview,
            user: thread.preview && thread.preview.sender
          }
        }));
      return Object.assign({}, state, {
        threads,
        isThreadsFetched: true,
        threadsPageNum: action.pageNumber || state.threadsPageNum,
        isThreadsExhausted: action.payload.length === 0
      });
    }
    case "DELETE_THREAD": {
      return Object.assign({}, state, {
        threads: state.threads.filter(t => t.id !== action.payload),
        messages: state.messages.filter(m => m.threadId !== action.payload)
      });
    }
    case "RECEIVE_EVENTS": {
      const events = state.events
        .filter(e => !action.payload.some(newEvent => newEvent.id === e.id))
        .concat(action.payload)
        .sort(
          (a, b) =>
            a.timestamp && b.timestamp && isBefore(a.timestamp, b.timestamp)
        )
        .map(event => ({ ...event, resourceType: "Event" }));
      return Object.assign({}, state, {
        events,
        isEventsFetched: true,
        eventsPageNum: action.pageNumber || state.eventsPageNum,
        isEventsExhausted: action.payload.length === 0
      });
    }
    case "DELETE_EVENT": {
      return Object.assign({}, state, {
        events: state.events.filter(t => t.id !== action.payload),
        messages: state.messages.filter(m => m.eventId !== action.payload)
      });
    }
    case "RECEIVE_MESSAGES": {
      if (!action.payload) return state;

      const messages = state.messages
        .filter(m => !action.payload.some(newMessage => newMessage.id === m.id))
        .concat(action.payload)
        .sort((a, b) => isBefore(a.timestamp, b.timestamp));

      // Update thread previews. Could probably optimize this.
      const threads = state.threads
        .map(thread => {
          action.payload.forEach(message => {
            if (message.parentId === thread.id) {
              if (!thread.preview) {
                thread.preview = message;
              }
            }
          });
          return thread;
        })
        .sort(
          (a, b) =>
            a.preview &&
            b.preview &&
            isBefore(a.preview.timestamp, b.preview.timestamp)
        );

      return Object.assign({}, state, {
        messages,
        threads
      });
    }
    case "RECEIVE_SELECTED_RESOURCE":
      return Object.assign({}, state, { selectedResourceId: action.payload });
    case "RECEIVE_CONTACTS":
      return Object.assign({}, state, {
        contacts: action.payload,
        isContactsFetched: true
      });
    case "RECEIVE_CONTACT":
      return Object.assign({}, state, {
        contacts: state.contacts.concat([action.payload])
      });
    case "REMOVE_CONTACT":
      return Object.assign({}, state, {
        contacts: state.contacts.filter(c => c.id !== action.payload.id)
      });
    case "LOGOUT":
      return Object.assign({}, initialState, {
        loading: { global: false }
      });
    case "RECEIVE_LOADING_STATE":
      return Object.assign({}, state, { ...state.loading, ...action.payload });
    default:
      return state;
  }
}
