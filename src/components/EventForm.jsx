import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format, parse, parseISO } from "date-fns";

import { useActions, useSelectors } from "../redux";
import { getSelectedResource, getContacts } from "../selectors";
import * as unboundEventActions from "../actions/events";
import * as unboundGeneralActions from "../actions/general";
import * as unboundNotifActions from "../actions/notifications";
import MultiMemberPickerField from "./MultiMemberPickerField";
import PlacePicker from "./PlacePicker";
import Map from "./Map";
import {
  FloatingPill,
  Text,
  Box,
  Heading,
  Paragraph,
  CenterContent
} from "./styles";
import { Container, Label, Input } from "./styles/CreateForm";
import MemberItemMedium from "./MemberItemMedium";
import Composer from "./Composer";

const OuterContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${themeGet("sidebarWidth")};
  width: 100%;
  height: auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});

  ${themeGet("media.tablet")} {
    grid-template-columns: minmax(0, 1fr) 0;
    & > div:nth-child(2) {
      visibility: hidden;
    }
  }
`;

const Form = styled.form``;

function validate(payload) {
  if (!payload.name) {
    return { message: "Please give your event a name" };
  } else if (!payload.placeID) {
    return { message: "Please choose a location" };
  } else if (payload.users && !payload.users.length) {
    return { message: "Please invite some people" };
  } else if (!payload.description) {
    return { message: "Please add a description" };
  } else {
    return null;
  }
}

function getDate(str, isEditing) {
  let dateArg = new Date();

  if (isEditing && str) {
    dateArg = parseISO(str);
  }

  return dateArg;
}

function getInitialDate(str, isEditing) {
  return format(getDate(str, isEditing), "yyyy-MM-dd");
}

function getInitialTime(str, isEditing) {
  return format(getDate(str, isEditing), "HH:mm");
}

function getInitVal(val, isEditing, fallback) {
  if (!isEditing || (isEditing && !val)) {
    return fallback;
  }

  return val;
}

export default function EventForm() {
  const history = useHistory();
  const isEditing = useRouteMatch("/events/edit");

  const persistErrorState = useRef(null);
  const nameEl = useRef(null);
  const [event, contacts] = useSelectors(getSelectedResource, getContacts);

  const {
    createEvent,
    updateEvent,
    setSelectedResource,
    dispatchNotification
  } = useActions({
    ...unboundEventActions,
    ...unboundGeneralActions,
    ...unboundNotifActions
  });

  const [name, setName] = useState(getInitVal(event.name, isEditing, ""));
  const [members, setMembers] = useState(
    getInitVal(event.users, isEditing, [])
  );
  const [date, setDate] = useState(getInitialDate(event.timestamp, isEditing));
  const [time, setTime] = useState(getInitialTime(event.timestamp, isEditing));
  const [place, setPlace] = useState(getInitVal(event.address, isEditing, ""));
  const [placeId, setPlaceId] = useState(
    getInitVal(event.placeID, isEditing, "")
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    nameEl.current && nameEl.current.focus();
  }, []);

  async function handleSubmit(description) {
    const datetime = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());

    const payload = {
      name,
      description,
      placeID: placeId,
      timestamp: datetime.toISOString()
    };

    if (!isEditing) {
      payload.users = members;
    }

    const error = validate(payload);
    if (error) {
      return dispatchNotification({
        message: error.message,
        type: "ERROR"
      });
    }

    setIsDisabled(true);

    let newEvent;
    try {
      if (isEditing) {
        newEvent = await updateEvent({ ...payload, id: event.id });
      } else {
        newEvent = await createEvent(payload);
      }
    } catch (e) {
      setIsDisabled(false);
      return;
    }

    setSelectedResource(newEvent.id);
    history.push("/convos");
  }

  function handleSelect(placeString, placeId) {
    setPlace(placeString);
    setPlaceId(placeId);
  }

  function handleMemberClick(member) {
    const isAdded = members.some(m => m.id === member.id);
    setMembers(
      isAdded
        ? members.filter(m => m.id !== member.id)
        : members.concat([member])
    );
  }

  if (
    persistErrorState.current ||
    (isEditing && (!event || event.resourceType !== "Event"))
  ) {
    persistErrorState.current = true;

    return (
      <CenterContent>
        <Box flexDirection="column" alignItems="center">
          <Text fontSize={4} mb={3}>
            Whoops{" "}
            <span role="img" aria-label="sad face">
              🙁
            </span>
          </Text>
          <Text>
            It looks like you're trying to edit a non-existent event. Try again?
          </Text>
        </Box>
      </CenterContent>
    );
  }

  return (
    <OuterContainer>
      <Container>
        <FloatingPill>
          <Form>
            <Box mt="-1rem">
              <Label>
                <Text fontSize={1} mr={1} flexShrink={0}>
                  Name:
                </Text>
                <Input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  maxLength="255"
                  fontSize={2}
                  placeholder="Give your event a name"
                  ref={nameEl}
                />
              </Label>
            </Box>

            <Box mb={3}>
              <Label>
                <Text fontSize={1} mr={1}>
                  Where:
                </Text>
                <PlacePicker
                  value={place}
                  onChange={newPlace => setPlace(newPlace)}
                  onSelect={handleSelect}
                />
              </Label>
              <Map placeId={placeId} />
            </Box>

            <Box flexDirection="row" mb={1}>
              <Label>
                <Text fontSize={1} mr={1}>
                  When:
                </Text>
                <Input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  maxLength="255"
                  fontSize={2}
                />
              </Label>
              <Label>
                <Text fontSize={1} mr={1}>
                  @
                </Text>
                <Input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  required
                  maxLength="255"
                  fontSize={2}
                />
              </Label>
            </Box>

            {!isEditing && (
              <Box>
                <Label>
                  <Text fontSize={1} mr={1}>
                    Guests:
                  </Text>
                  <MultiMemberPickerField
                    members={members}
                    setMembers={setMembers}
                  />
                </Label>
              </Box>
            )}

            <Composer
              backgroundColor="gray"
              height="16rem"
              placeholder="Tell your guests what your event is about..."
              onClick={handleSubmit}
              isDisabled={isDisabled}
              initialValue={getInitVal(event.description, isEditing, "")}
            />
          </Form>
        </FloatingPill>
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <Heading fontSize={4} color="darkGray">
            {isEditing ? "Update your event" : "Create an event"}
          </Heading>
          <Paragraph fontSize={1} color="gray" lineHeight="1.3em" mb={4}>
            {isEditing
              ? "Your guests will receive an updated invite email. Please be mindful of excessive and repetitive email and keep updates to a minimum."
              : "Click on your contacts below to invite them to your event."}
          </Paragraph>
          {!isEditing && (
            <React.Fragment>
              <Text color="gray" mb={2} fontSize={0}>
                Your contacts
              </Text>
              <Box as="ul">
                {contacts.map(contact => (
                  <MemberItemMedium
                    key={contact.id}
                    member={contact}
                    isChecked={members.some(m => m.id === contact.id)}
                    onClickOverride={() => handleMemberClick(contact)}
                  />
                ))}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </OuterContainer>
  );
}
