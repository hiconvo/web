import * as API from "../api/events";
import { dispatchNotification } from "./notifications";
import { errorToString } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchEvents = dispatch =>
  /*
   * @returns {undefined}
   */
  async (pageNumber = 0) => {
    try {
      const response = await API.getEvents(pageNumber);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: response.events,
        pageNumber
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const fetchEvent = dispatch =>
  /*
   * @returns {undefined}
   */
  async id => {
    try {
      const response = await API.getEvent(id);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [response]
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const createEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.placeId
   * @param {datetime} payload.timestamp
   * @param {Contact[]} payload.users
   * @param {string} payload.description
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.createEvent(payload);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const updateEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.id
   * @param {string} payload.name
   * @param {string} payload.placeId
   * @param {string} payload.address
   * @param {datetime} payload.timestamp
   * @param {string} payload.description
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.updateEvent(payload.id, payload);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
      dispatchNotification()({ type: "SUCCESS", message: "Updated event" });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const addUserToEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.event
   * @param {Object} payload.user
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.addUserToEvent(payload.event.id, payload.user.id);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Added ${payload.user.fullName} to ${payload.event.name}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const removeUserFromEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.event
   * @param {Object} payload.user
   * @param {bool} payload.removeEvent
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.removeUserFromEvent(payload.event.id, payload.user.id);

      if (payload.removeEvent) {
        dispatch({
          type: "DELETE_EVENT",
          payload: event.id
        });
      } else {
        dispatch({
          type: "RECEIVE_EVENTS",
          payload: [event]
        });
      }

      dispatchNotification()({
        type: "SUCCESS",
        message: `Removed ${payload.user.fullName} from ${payload.event.name}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const addRSVPToEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.event
   * @param {Object} payload.user
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.addRSVPToEvent(payload.event.id, payload.user.id);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `RSVP'd to ${payload.event.name}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const removeRSVPFromEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.event
   * @param {Object} payload.user
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.removeRSVPFromEvent(payload.event.id, payload.user.id);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Removed RSVP from ${payload.event.name}`
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const deleteEvent = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.event
   * @param {string} payload.message
   * @returns {undefined}
   */
  async payload => {
    try {
      await API.deleteEvent(payload.event.id, { message: payload.message });
      dispatchNotification()({
        type: "SUCCESS",
        message: `Deleted ${payload.event.name}`
      });
      dispatch({
        type: "DELETE_EVENT",
        payload: payload.event.id
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const magicRsvp = dispatch =>
  /*
   * @param {Object} payload
   * @param {Object} payload.eventID
   * @param {Object} payload.userID
   * @param {Object} payload.timestamp
   * @param {Object} payload.signature
   * @returns {undefined}
   */
  async payload => {
    try {
      const user = await API.magicRsvp(payload);
      localStorage.setItem("userToken", user.token);
      dispatch({
        type: "RECEIVE_USER",
        payload: user
      });

      const { events } = await API.getEvents();
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: events
      });

      const event = events.find(ev => ev.id === payload.eventID);
      dispatchNotification()({
        type: "SUCCESS",
        message: `RSVP'd to ${event.name}`
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const markEventAsRead = dispatch =>
  /*
   * @param {Object} payload.id
   * @returns {Object} Event
   */
  async payload => {
    let event;
    try {
      event = await API.markAsRead(payload.id);
      dispatch({
        type: "RECEIVE_EVENTS",
        payload: [event]
      });
    } catch (e) {
      dispatchNotification()({ type: "ERROR", message: errorToString(e) });
      return Promise.reject(e);
    }

    return event;
  };
