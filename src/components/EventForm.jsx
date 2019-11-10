import React, { useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { format, parse, parseISO } from "date-fns";
import { useFormik } from "formik";

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

function validate(payload) {
  if (!payload.name) {
    return { message: "Please give your event a name" };
  } else if (!payload.placeID) {
    return { message: "Please choose a location" };
  } else if (payload.members && !payload.members.length) {
    return { message: "Please invite some people" };
  } else if (getTextFromEditorState(payload.description).length <= 0) {
    return { message: "Please add a description" };
  } else {
    return {};
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

async function handleSubmit({
  values,
  setSubmitting,
  updateEvent,
  createEvent,
  history,
  isEditing,
  setSelectedResource,
  event
}) {
  const datetime = parse(
    `${values.date} ${values.time}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const payload = {
    name: values.name,
    description: getTextFromEditorState(values.description),
    placeID: values.placeID,
    timestamp: datetime.toISOString()
  };

  if (!isEditing) {
    payload.users = values.members;
  }

  let newEvent;
  try {
    if (isEditing) {
      newEvent = await updateEvent({ ...payload, id: event.id });
    } else {
      newEvent = await createEvent(payload);
    }
  } catch (e) {
    setSubmitting(false);
    return;
  }

  setSelectedResource(newEvent.id);
  history.push("/convos");
}

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

  const formik = useFormik({
    initialValues: {
      name: getInitVal(event.name, isEditing, ""),
      date: getInitialDate(event.timestamp, isEditing),
      time: getInitialTime(event.timestamp, isEditing),
      place: getInitVal(event.address, isEditing, ""),
      placeId: getInitVal(event.placeID, isEditing, ""),
      members: getInitVal(event.users, isEditing, []),
      description: getInitialEditorState(
        getInitVal(event.description, isEditing, "")
      )
    },
    validate: values => {
      const results = validate(values);
      if (results.message) {
        dispatchNotification({ message: results.message });
        return results;
      } else {
        return {};
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit({
        values,
        setSubmitting,
        createEvent,
        updateEvent,
        setSelectedResource,
        history,
        isEditing,
        event
      })
  });

  useEffect(() => {
    nameEl.current && nameEl.current.focus();
  }, []);

  function handleMemberClick(member) {
    const isAdded = formik.values.members.some(m => m.id === member.id);

    formik.setFieldValue(
      "members",
      isAdded
        ? formik.values.members.filter(m => m.id !== member.id)
        : formik.values.members.concat([member])
    );
  }

  if (
    persistErrorState.current ||
    (isEditing && (!event || event.resourceType !== "Event"))
  ) {
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isDisabled={formik.isSubmitting}
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
                  value={formik.values.place}
                  onChange={newPlace => formik.setFieldValue("place", newPlace)}
                  onSelect={(placeString, placeId) => {
                    formik.setFieldValue("place", placeString);
                    formik.setFieldValue("placeID", placeId);
                  }}
                />
              </Label>
              <Map placeId={formik.values.placeID} noLink />
            </Box>

            <Box flexDirection="row" mb={1}>
              <Label>
                <Text fontSize={1} mr={1}>
                  When:
                </Text>
                <Input
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  required
                  maxLength="255"
                  isDisabled={formik.isSubmitting}
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
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  required
                  maxLength="255"
                  isDisabled={formik.isSubmitting}
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
                    members={formik.values.members}
                    setMembers={val => formik.setFieldValue("members", val)}
                  />
                </Label>
              </Box>
            )}

            <Composer
              backgroundColor="gray"
              height="16rem"
              placeholder="Tell your guests what your event is about..."
              editorState={formik.values.description}
              onChange={val => formik.setFieldValue("description", val)}
              isDisabled={formik.isSubmitting}
            />
            <Controls
              editorState={formik.values.body}
              onClick={formik.handleSubmit}
              isDisabled={formik.isSubmitting}
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
                  isChecked: formik.values.members.some(
                    m => m.id === props.user.id
                  ),
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
