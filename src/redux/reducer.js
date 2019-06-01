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
  threads: [],
  messages: [],
  contacts: []
};

export default function reducer(state, action) {
  switch (action.type) {
    case "RECIEVE_USER":
      return Object.assign({}, state, {
        user: action.payload,
        loading: {
          global: false,
          auth: false
        }
      });
    case "RECEIVE_AUTH_ERROR":
      return Object.assign({}, state, {
        errors: { auth: action.payload },
        loading: {
          global: false,
          auth: false
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
