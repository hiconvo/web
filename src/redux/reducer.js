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
    case "RECEIVE_THREADS":
      return Object.assign({}, state, {
        threads: state.threads.concat(action.payload),
        loading: {
          global: false
        }
      });
    case "RECEIVE_MESSAGES":
      return Object.assign({}, state, {
        messages: state.messages.concat(action.payload),
        loading: {
          global: false
        }
      });
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
    default:
      return state;
  }
}
