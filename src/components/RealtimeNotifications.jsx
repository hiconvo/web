import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import stream from "getstream";
import { themeGet } from "@styled-system/theme-get";
import { formatDistanceToNow, parseISO } from "date-fns";
import * as Sentry from "@sentry/browser";

import { useActions } from "../redux";
import * as unboundMessageActions from "../actions/messages";
import * as unboundEventActions from "../actions/events";
import { useSelectors } from "../redux";
import { getUser, getIsLoggedIn } from "../selectors";
import { Dropdown, Text, Box, UnstyledButton, Icon } from "./styles";

const getReadableVerb = (verb) => {
  switch (verb) {
    case "AddRSVP":
      return "is going to";
    case "RemoveRSVP":
      return "can't make it to";
    case "NewMessage":
      return "sent a message to";
    case "DeleteEvent":
      return "canceled";
    case "NewEvent":
      return "invited you to";
    case "UpdatedEvent":
      return "updated";
    default:
      return "updated";
  }
};

const Circle = styled(UnstyledButton)`
  background-color: ${(props) =>
    themeGet(`colors.${props.active ? "primary" : "lightGray"}`)(props)};
  color: ${(props) =>
    themeGet(`colors.${props.active ? "white" : "darkGray"}`)(props)};
  height: 3.6rem;
  width: 3.6rem;
  border-radius: 100%;
  transition: all ease ${themeGet("animations.fast")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
  margin-right: ${themeGet("space.2")};

  &:hover {
    background-color: ${(props) =>
      themeGet(`colors.${props.active ? "primary900" : "mediumGray"}`)(props)};
    color: ${themeGet("colors.white")};
  }
`;

const DropdownItemsContainer = styled.ul`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 30rem;
  max-height: 50vh;
  overflow-y: scroll;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  z-index: 30;
  padding: ${themeGet("space.2")};
`;

const NotifNullState = () => (
  <Box height="10rem" alignItems="center" justifyContent="center">
    <Text>
      No notifications{" "}
      <span role="img" aria-label="annoyed face">
        😑
      </span>
    </Text>
  </Box>
);

const Notif = ({ notif, onClick }) => (
  <Box as="li">
    {notif.activities.slice(0, 1).map((act) => (
      <UnstyledButton
        key={act.id}
        onClick={() => onClick(act)}
        p={2}
        alignItems="flex-start"
      >
        <Box width="100%">
          <Box flexDirection="row">
            <Box width="2rem" mr={2}>
              <Icon
                name={act.verb === "NewMessage" ? "mail" : "event"}
                fontSize={3}
              />
            </Box>
            <Box>
              <Box>
                <Text fontSize={1}>
                  <Text fontSize={1} fontWeight="bold">
                    {act.actor}
                  </Text>{" "}
                  {getReadableVerb(act.verb)} {act.targetName}
                </Text>
              </Box>
              <Box>
                <Text fontSize={0} color="gray">
                  {formatDistanceToNow(parseISO(act.time), { addSuffix: true })}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </UnstyledButton>
    ))}
  </Box>
);

let client, feed;

export default function RealtimeNotifications() {
  const history = useHistory();
  const { fetchEvent } = useActions(unboundEventActions);
  const { fetchThreadMessages } = useActions(unboundMessageActions);
  const { fetchEventMessages } = useActions(unboundMessageActions);
  const [isLoggedIn, user] = useSelectors(getIsLoggedIn, getUser);
  const [notifs, setNotifs] = useState([]);
  const subscription = useRef(null);

  function markAllAsRead() {
    setNotifs(notifs.map((n) => ({ ...n, is_read: true, is_seen: true })));
    feed && feed.get({ mark_seen: true, mark_read: true });
  }

  function handleNotifClick({ object }) {
    const [resourceType, id] = object.split(":");
    if (resourceType === "event") {
      fetchEvent(id);
      fetchEventMessages(id);
      history.push(`/events/${id}`);
    } else if (resourceType === "thread") {
      fetchThreadMessages(id);
      history.push(`/convos/${id}`);
    }
  }

  useEffect(() => {
    if (isLoggedIn && !(client || feed || subscription.current)) {
      try {
        client = stream.connect("kqm59q4584ah", null, "62737");
        feed = client.feed("notification", user.id, user.realtimeToken);
      } catch (e) {
        Sentry.captureException(e);
        return;
      }

      feed.get().then((newNotifs) => setNotifs(newNotifs.results));

      subscription.current = feed.subscribe((newNotifs) => {
        setNotifs((notifs) =>
          [].concat(
            newNotifs.new.map((n) => ({
              is_read: false,
              is_seen: false,
              activities: [n]
            })),
            notifs
          )
        );
      });
    }

    return () => {
      subscription.current && subscription.current.cancel();
      subscription.current = null;
      feed = null;
      client = null;
    };
  }, [isLoggedIn, user, subscription]);

  if (!isLoggedIn) {
    return <div />;
  }

  const filteredNotifs = notifs.filter((n) => !(n.is_read || n.is_seen));

  return (
    <Box>
      <Dropdown
        renderAnchor={({ onClick }) => (
          <Circle
            active={filteredNotifs.length > 0}
            onClick={() => {
              markAllAsRead();
              onClick();
            }}
          >
            {filteredNotifs.length}
          </Circle>
        )}
      >
        {({ isOpen, isVisible, handleToggle }) => (
          <DropdownItemsContainer
            isOpen={isOpen}
            isVisible={isVisible}
            onClick={handleToggle}
          >
            {notifs.map((notif) => (
              <Notif key={notif.id} notif={notif} onClick={handleNotifClick} />
            ))}
            {notifs.length === 0 && <NotifNullState key="null" />}
          </DropdownItemsContainer>
        )}
      </Dropdown>
    </Box>
  );
}
