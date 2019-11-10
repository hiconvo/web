import React, { useEffect, useRef, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import {
  getInitVal,
  getInitDate,
  getInitTime,
  getISOFromDateTime
} from "../utils/forms";
import { useActions, useSelectors } from "../redux";
import { getSelectedResource, getContacts } from "../selectors";
import * as unboundEventActions from "../actions/events";
import * as unboundGeneralActions from "../actions/general";
import * as unboundNotifActions from "../actions/notifications";
import MultiMemberPickerField from "./MultiMemberPickerField";
import PlacePicker from "./PlacePicker";
import RegisterWarning from "./RegisterWarning";
import Map from "./Map";
import UserOverflowList from "./UserOverflowList";
import {
  FloatingPill,
  Text,
  Box,
  Heading,
  Paragraph,
  CenterContent
} from "./styles";
import { Container, Label, Input } from "./styles/CreateForm";
import Composer, {
  getInitialEditorState,
  getTextFromEditorState
} from "./Composer";
import Controls from "./MessageComposerControls";

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

const validate = payload => {
  if (!payload.name) {
    return { message: "Please give your event a name" };
  } else if (!payload.placeID) {
    return { message: "Please choose a location" };
  } else if (payload.members && !payload.members.length) {
    return { message: "Please invite some people" };
  } else if (getTextFromEditorState(payload.description).length <= 0) {
    return { message: "Please add a description" };
  } else {
    return null;
  }
};

function NullState() {
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

export default function EventForm() {
  const persistErrorState = useRef(null);
  const nameEl = useRef(null);
  const history = useHistory();
  const isEditing = useRouteMatch("/events/edit");
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
  const initialValues = {
    name: getInitVal(event.name, isEditing, ""),
    date: getInitDate(event.timestamp, isEditing),
    time: getInitTime(event.timestamp, isEditing),
    place: getInitVal(event.address, isEditing, ""),
    placeId: getInitVal(event.placeID, isEditing, ""),
    members: getInitVal(event.users, isEditing, []),
    description: getInitialEditorState(
      getInitVal(event.description, isEditing, "")
    )
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState(initialValues.name);
  const [date, setDate] = useState(initialValues.date);
  const [time, setTime] = useState(initialValues.time);
  const [place, setPlace] = useState(initialValues.place);
  const [placeId, setPlaceId] = useState(initialValues.placeId);
  const [members, setMembers] = useState(initialValues.members);
  const [description, setDescription] = useState(initialValues.description);

  const handleSubmit = async e => {
    e && e.preventDefault();

    const action = isEditing ? updateEvent : createEvent;
    const rest = isEditing ? { id: event.id } : { users: members };

    const payload = {
      name: name,
      description: getTextFromEditorState(description),
      placeID: placeId,
      timestamp: getISOFromDateTime(date, time),
      ...rest
    };

    const errors = validate(payload);

    if (errors && errors.message) {
      return dispatchNotification({ message: errors.message });
    }

    setIsSubmitting(true);

    let newEvent;
    try {
      newEvent = await action(payload);
    } catch (e) {
      return;
    } finally {
      setIsSubmitting(false);
    }

    setSelectedResource(newEvent.id);
    history.push("/convos");
  };

  const handleMemberClick = member => {
    const isAdded = members.some(m => m.id === member.id);

    setMembers(
      isAdded
        ? members.filter(m => m.id !== member.id)
        : members.concat([member])
    );
  };

  useEffect(() => {
    nameEl.current && nameEl.current.focus();
  }, []);

  const manuallyNavigatedToFormInError =
    persistErrorState.current ||
    (isEditing && (!event || event.resourceType !== "Event"));

  if (manuallyNavigatedToFormInError) {
    persistErrorState.current = true;

    return <NullState />;
  }

  return (
    <OuterContainer>
      <Container>
        <RegisterWarning />
        <FloatingPill>
          <Form>
            <Box mt="-1rem">
              <Label>
                <Text fontSize={1} mr={1} flexShrink={0}>
                  Name:
                </Text>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  isDisabled={isSubmitting}
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
                  onSelect={(placeString, placeId) => {
                    setPlace(placeString);
                    setPlaceId(placeId);
                  }}
                />
              </Label>
              <Map placeId={placeId} noLink />
            </Box>

            <Box flexDirection="row" mb={1}>
              <Label>
                <Text fontSize={1} mr={1}>
                  When:
                </Text>
                <Input
                  type="date"
                  name="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  maxLength="255"
                  isDisabled={isSubmitting}
                  fontSize={2}
                />
              </Label>
              <Label>
                <Text fontSize={1} mr={1}>
                  @
                </Text>
                <Input
                  type="time"
                  name="time"
                  value={time}
                  onChange={e => setTime(e.target.time)}
                  required
                  maxLength="255"
                  isDisabled={isSubmitting}
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
                    setMembers={newMembers => setMembers(newMembers)}
                  />
                </Label>
              </Box>
            )}

            <Composer
              backgroundColor="gray"
              height="16rem"
              placeholder="Tell your guests what your event is about..."
              editorState={description}
              onChange={newDescription => setDescription(newDescription)}
              isDisabled={isSubmitting}
            />
            <Controls
              editorState={description}
              onClick={handleSubmit}
              isDisabled={isSubmitting}
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
              <UserOverflowList
                maxLength={10}
                users={contacts}
                transformUserProps={props => ({
                  ...props,
                  isChecked: members.some(m => m.id === props.user.id),
                  onClickOverride: () => handleMemberClick(props.user)
                })}
                renderExtraChildren={() =>
                  contacts.length <= 0 && (
                    <Text fontSize={1} mt={2} color="gray">
                      You haven't added any contacts yet.
                    </Text>
                  )
                }
              />
            </React.Fragment>
          )}
        </Box>
      </Box>
    </OuterContainer>
  );
}
