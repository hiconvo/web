import { generateId } from "../utils";

/*
 * @param {function} dispatch
 * @returns {function}
 */
export const dispatchNotification = dispatch =>
  /*
   * @param {Object} notification
   * @param {string} notification.message
   * @param {string} notification.type, one of "NEUTRAL", "FAILURE", or "SUCCESS"
   * @returns {undefined}
   */
  ({ message = "", type = "NEUTRAL" }) => {
    document.dispatchEvent(
      new CustomEvent("notification", {
        detail: { id: generateId(), message, type }
      })
    );
  };
