import { isBefore } from "../utils";

export const initialState = {
  loading: { global: true },
  user: null,
  selectedResourceId: null,
  threads: [],
  events: [],
  messages: [],
  contacts: [],
  notes: [],
  pins: [],
  isContactsFetched: false,
  isThreadsFetched: false,
  isEventsFetched: false,
  isNotesFetched: false,
  threadsPageNum: 0,
  eventsPageNum: 0,
  notesPageNum: 0,
  isThreadsExhausted: false,
  isEventsExhausted: false,
  isNotesExhausted: false
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
        .filter(
          (t) => !action.payload.some((newThread) => newThread.id === t.id)
        )
        .concat(action.payload)
        .sort((a, b) => isBefore(a.updatedAt, b.updatedAt))
        .map((thread) => ({
          ...thread,
          resourceType: "Thread"
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
        threads: state.threads.filter((t) => t.id !== action.payload),
        messages: state.messages.filter((m) => m.threadId !== action.payload)
      });
    }
    case "RECEIVE_EVENTS": {
      const events = state.events
        .filter((e) => !action.payload.some((newEvent) => newEvent.id === e.id))
        .concat(action.payload)
        .sort(
          (a, b) =>
            a.createdAt && b.createdAt && isBefore(a.createdAt, b.createdAt)
        )
        .map((event) => ({ ...event, resourceType: "Event" }));
      return Object.assign({}, state, {
        events,
        isEventsFetched: true,
        eventsPageNum: action.pageNumber || state.eventsPageNum,
        isEventsExhausted: action.payload.length === 0
      });
    }
    case "DELETE_EVENT": {
      return Object.assign({}, state, {
        events: state.events.filter((t) => t.id !== action.payload),
        messages: state.messages.filter((m) => m.eventId !== action.payload)
      });
    }
    case "RECEIVE_MESSAGES": {
      if (!action.payload) return state;

      const messages = state.messages
        .filter(
          (m) => !action.payload.some((newMessage) => newMessage.id === m.id)
        )
        .concat(action.payload)
        .sort((a, b) => isBefore(a.createdAt, b.createdAt));
      return Object.assign({}, state, {
        messages
      });
    }
    case "DELETE_MESSAGES": {
      return Object.assign({}, state, {
        messages: state.messages.filter((m) =>
          action.payload.some((msg) => msg.id !== m.id)
        )
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
        contacts: state.contacts.filter((c) => c.id !== action.payload.id)
      });
    case "LOGOUT":
      return Object.assign({}, initialState, {
        loading: { global: false }
      });
    case "CLEAR_NOTES": {
      return Object.assign({}, state, {
        notes: [],
        isNotesFetched: false,
        pageNumber: 0
      });
    }
    case "RECEIVE_NOTES_MERGE": {
      const notes = state.notes
        .filter((n) => !action.payload.some((newNote) => newNote.id === n.id))
        .concat(action.payload)
        .sort((a, b) => isBefore(a.createdAt, b.createdAt));
      const pins = state.pins
        .filter((n) => !action.payload.some((newNote) => newNote.id === n.id))
        .concat(action.payload.filter((n) => n.pin))
        .sort((a, b) => isBefore(a.createdAt, b.createdAt));
      return Object.assign({}, state, {
        notes,
        pins,
        isNotesFetched: true,
        notesPageNum: action.pageNumber || state.notesPageNum,
        isNotesExhausted: action.payload.length === 0
      });
    }
    case "RECEIVE_NOTES": {
      const notes = action.payload.notes.sort((a, b) =>
        isBefore(a.createdAt, b.createdAt)
      );
      const pins = action.payload.pins
        ? action.payload.pins.sort((a, b) => isBefore(a.createdAt, b.createdAt))
        : [];
      return Object.assign({}, state, {
        notes,
        pins,
        isNotesFetched: true,
        notesPageNum: action.pageNumber || state.notesPageNum,
        isNotesExhausted: action.payload.length === 0
      });
    }
    case "DELETE_NOTE": {
      return Object.assign({}, state, {
        notes: state.notes.filter((n) => n.id !== action.payload),
        pins: state.pins.filter((n) => n.id !== action.payload)
      });
    }
    case "RECEIVE_LOADING_STATE":
      return Object.assign({}, state, { ...state.loading, ...action.payload });
    default:
      return state;
  }
}
