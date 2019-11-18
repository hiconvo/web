import React, { useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";

import {
  getInitVal,
  getInitDate,
  getInitTime,
  getISOFromDateTime
} from "../utils/forms";
import useFormik from "../hooks/formik";
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
  } else if (!payload.placeId) {
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
  const formik = useFormik({
    formId: isEditing ? undefined : "newEvent",
    initialValues: {
      name: getInitVal(event.name, isEditing, ""),
      date: getInitDate(event.timestamp, isEditing),
      time: getInitTime(event.timestamp, isEditing),
      place: getInitVal(event.address, isEditing, ""),
      placeId: getInitVal(event.placeID, isEditing, ""),
      members: getInitVal(event.users, isEditing, []),
      description: getInitialEditorState(
        getInitVal(event.description, isEditing, "")
      ),
      guestsCanInvite: getInitVal(event.guestsCanInvite, isEditing, false),
      resend: false
    },
    validate: validate,
    onSubmit: async (values, { setSubmitting, errors }) => {
      if (errors && errors.message) {
        return dispatchNotification({ message: errors.message });
      }

      const action = isEditing ? updateEvent : createEvent;
      const rest = isEditing
        ? { id: event.id, resend: values.resend }
        : { users: values.members };

      const payload = {
        name: values.name,
        description: getTextFromEditorState(values.description),
        placeID: values.placeId,
        timestamp: getISOFromDateTime(values.date, values.time),
        guestsCanInvite: values.guestsCanInvite,
        ...rest
      };

      setSubmitting(true);

      let newEvent;
      try {
        newEvent = await action(payload);
      } catch (e) {
        return;
      } finally {
        setSubmitting(false);
      }

      setSelectedResource(newEvent.id);
      history.push("/convos");
    }
  });

  useEffect(() => {
    nameEl.current && nameEl.current.focus();
  }, []);

  const handleMemberClick = member => {
    const isAdded = formik.values.members.some(m => m.id === member.id);

    formik.setFieldValue(
      "members",
      isAdded
        ? formik.values.members.filter(m => m.id !== member.id)
        : formik.values.members.concat([member])
    );
  };

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
              <Label mb={1}>
                <Text fontSize={1} mr={1}>
                  Where:
                </Text>
                <PlacePicker
                  value={formik.values.place}
                  onChange={newPlace => formik.setFieldValue("place", newPlace)}
                  onSelect={(placeString, placeId) =>
                    formik.setFieldValues({
                      place: placeString,
                      placeId: placeId
                    })
                  }
                />
              </Label>
              <Map placeId={formik.values.placeId} noLink />
            </Box>

            <Box flexDirection={["column", "row"]}>
              <Box width={["100%", "50%"]} overflow="hidden">
                <Label>
                  <Text fontSize={1} mr={1}>
                    When:
                  </Text>
                  <DatePicker
                    name="date"
                    selected={parse(
                      formik.values.date,
                      "yyyy-MM-dd",
                      new Date()
                    )}
                    dateFormat="MMMM dd, yyyy"
                    onChange={newDate =>
                      formik.setFieldValue(
                        "date",
                        format(newDate, "yyyy-MM-dd")
                      )
                    }
                  />
                </Label>
              </Box>

              <Box width={["100%", "50%"]}>
                <Label>
                  <Text fontSize={1} mr={2}>
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
            </Box>

            <Box mt={[3, 0]}>
              <Label>
                <Text fontSize={1} mr={1} flexShrink={0}>
                  Allow guests to invite others:
                </Text>
                <Input
                  type="checkbox"
                  name="guestsCanInvite"
                  checked={formik.values.guestsCanInvite}
                  onChange={e =>
                    formik.setFieldValue("guestsCanInvite", e.target.checked)
                  }
                  isDisabled={formik.isSubmitting}
                  width="auto"
                />
              </Label>
            </Box>

            {isEditing && (
              <Box mt={[3, 0]}>
                <Label>
                  <Text fontSize={1} mr={1} flexShrink={0}>
                    Resend invitations:
                  </Text>
                  <Input
                    type="checkbox"
                    name="resend"
                    checked={formik.values.resend}
                    onChange={e =>
                      formik.setFieldValue("resend", e.target.checked)
                    }
                    isDisabled={formik.isSubmitting}
                    width="auto"
                  />
                </Label>
              </Box>
            )}

            {!isEditing && (
              <Box mt={[2, 0]}>
                <Label>
                  <Text fontSize={1} mr={1}>
                    Guests:
                  </Text>
                  <MultiMemberPickerField
                    members={formik.values.members}
                    setMembers={newMembers =>
                      formik.setFieldValue("members", newMembers)
                    }
                  />
                </Label>
              </Box>
            )}

            <Composer
              backgroundColor="gray"
              height="16rem"
              placeholder="Tell your guests what your event is about..."
              editorState={formik.values.description}
              onChange={newDescription =>
                formik.setFieldValue("description", newDescription)
              }
              isDisabled={formik.isSubmitting}
            />
            <Controls
              editorState={formik.values.description}
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
              ? "Your guests will receive an updated invite email if you check the resend invitations option to the left. Please be mindful of excessive and repetitive email and keep updates to a minimum."
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
