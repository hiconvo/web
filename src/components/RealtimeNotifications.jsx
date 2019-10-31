import React, { useEffect, useState } from "react";
import styled from "styled-components";
import stream from "getstream";
import { themeGet } from "@styled-system/theme-get";
import { formatDistanceToNow, parseISO } from "date-fns";

import { useSelectors } from "../redux";
import { getUser, getIsLoggedIn } from "../selectors";
import { Dropdown, Text, Box, UnstyledButton } from "./styles";

const Circle = styled(UnstyledButton)`
  background-color: ${props =>
    themeGet(`colors.${props.active ? "primary" : "lightGray"}`)(props)}
  color: ${props =>
    themeGet(`colors.${props.active ? "white" : "darkGray"}`)(props)}
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
    background-color: ${props =>
      themeGet(`colors.${props.active ? "primary900" : "mediumGray"}`)(props)}
  }
`;

const DropdownItemsContainer = styled.ul`
  display: ${props => (props.isOpen ? "block" : "none")};
  width: 30rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
  z-index: 30;
  padding: ${themeGet("space.2")};
`;

const getReadableVerb = verb => {
  switch (verb) {
    case "AddRSVP":
      return "is going to";
    case "RemoveRSVP":
      return "can't make it to";
    default:
      return "did something in";
  }
};

const Notif = ({ notif }) => (
  <Box as="li">
    {notif.activities.map(act => (
      <Box key={act.id} p={2}>
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
    ))}
  </Box>
);

let client, feed, subscription;

export default function RealtimeNotifications() {
  const [isLoggedIn, user] = useSelectors(getIsLoggedIn, getUser);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    if (isLoggedIn && !(client || feed || subscription)) {
      client = stream.connect("kqm59q4584ah", null, "62737");
      feed = client.feed("notification", user.id, user.realtimeToken);

      feed
        .get({ mark_seen: true, mark_read: true })
        .then(newNotifs => setNotifs(newNotifs.results));

      feed
        .subscribe(newNotifs => setNotifs(notifs.concat(newNotifs.results)))
        .then(
          () => console.log("listening..."),
          e => console.log("not listening: ", e)
        );
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return <div />;
  }

  console.log(notifs);

  const filteredNotifs = notifs.filter(n => !(n.is_read || n.is_seen));

  return (
    <Box>
      <Dropdown
        renderAnchor={({ onClick }) => (
          <Circle active={filteredNotifs.length > 0} onClick={onClick}>
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
            {notifs.map(notif => (
              <Notif key={notif.id} notif={notif} />
            ))}
          </DropdownItemsContainer>
        )}
      </Dropdown>
    </Box>
  );
}
