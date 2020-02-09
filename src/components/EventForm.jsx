import React from "react";
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
import { useActions } from "../redux";
import * as unboundEventActions from "../actions/events";
import * as unboundNotifActions from "../actions/notifications";
import MultiMemberPickerField from "./MultiMemberPickerField";
import PlacePicker from "./PlacePicker";
import RegisterWarning from "./RegisterWarning";
import Map from "./Map";
import {
  Text,
  Box,
  Heading,
  Paragraph,
  Input,
  TextArea,
  Checkbox,
  Button
} from "./styles";

const Container = styled.form`
  width: 100%;
  max-width: 70rem;
  height: auto;
  margin: 0 auto ${themeGet("space.5")} auto;
  min-height: calc(100vh - ${themeGet("headerHeight")});
`;

const PseudoHoverInput = styled.div`
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  outline: none;
  transition: border ease ${themeGet("animations.fast")};
  border-radius: 0.4rem;
  font-family: ${themeGet("fonts.sans")};
  background-color: ${themeGet("colors.trueWhite")};

  &:hover {
    border: 0.1rem solid ${themeGet("colors.mediumGray")};
  }

  &:focus {
    border: 0.1rem solid ${themeGet("colors.darkGray")};
  }
`;

const validate = payload => {
  if (!payload.name) {
    return { message: "Please give your event a name" };
  } else if (!payload.placeId) {
    return { message: "Please choose a location" };
  } else if (payload.members && !payload.members.length) {
    return { message: "Please invite some people" };
  } else if (payload.description.length <= 0) {
    return { message: "Please add a description" };
  } else {
    return null;
  }
};

export default function EventForm({ event }) {
  const history = useHistory();
  const isEditing = useRouteMatch("/events/:id/edit");
  const { createEvent, updateEvent, dispatchNotification } = useActions({
    ...unboundEventActions,
    ...unboundNotifActions
  });
  const formik = useFormik({
    formId: isEditing ? undefined : "newEvent",
    initialValues: {
      name: getInitVal(event.name, isEditing, ""),
      date: getInitDate(event.timestamp, isEditing),
      time: getInitTime(event.timestamp, isEditing),
      place: getInitVal(event.address, isEditing, ""),
      placeId: getInitVal(event.placeId, isEditing, ""),
      members: getInitVal(event.users, isEditing, []),
      description: getInitVal(event.description, isEditing, ""),
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
        description: values.description,
        placeId: values.placeId,
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

      history.push(`/events/${newEvent.id}`);
    }
  });

  return (
    <Container>
      <RegisterWarning />
      <Heading fontSize={4} color="darkGray">
        {isEditing ? "Update your event" : "Create an event"}
      </Heading>
      <Paragraph fontSize={1} color="gray" lineHeight="1.3em" mb={4}>
        {isEditing
          ? "Your guests will receive an updated invite email if you check the resend invitations option at the bottom. Please be mindful of excessive and repetitive email and keep updates to a minimum."
          : "Complete the form to create an event and send invitations. If you do not complete this form now, your progress will be saved for later. Your guests will not be required to create an account on Convo in order to RSVP."}
      </Paragraph>
      <Input
        type="text"
        name="Name"
        tabIndex="1"
        value={formik.values.name}
        onChange={formik.handleChange}
        isDisabled={formik.isSubmitting}
        required
        maxLength="255"
        fontSize={2}
        placeholder="Give your event a name"
      />

      <PlacePicker
        inputComponent={Input}
        tabIndex="2"
        value={formik.values.place}
        onChange={newPlace => formik.setFieldValue("place", newPlace)}
        onSelect={(placeString, placeId) =>
          formik.setFieldValues({
            place: placeString,
            placeId: placeId
          })
        }
      />

      <Box mt={2} mb={3} tabIndex="-1">
        <Map placeId={formik.values.placeId} noLink />
      </Box>

      <Box
        flexDirection={["column", "row"]}
        justifyContent={["unset", "space-between"]}
      >
        <Box width={["100%", "49%"]} overflow="hidden">
          <Box py={1}>
            <Text fontSize={1}>Date</Text>
            <DatePicker
              tabIndex="3"
              name="Date"
              selected={parse(formik.values.date, "yyyy-MM-dd", new Date())}
              dateFormat="MMMM dd, yyyy"
              onChange={newDate =>
                formik.setFieldValue("date", format(newDate, "yyyy-MM-dd"))
              }
            />
          </Box>
        </Box>

        <Box width={["100%", "49%"]}>
          <Input
            type="time"
            name="Time"
            tabIndex="4"
            value={formik.values.time}
            onChange={formik.handleChange}
            required
            maxLength="255"
            isDisabled={formik.isSubmitting}
            fontSize={2}
          />
        </Box>
      </Box>

      {!isEditing && (
        <Box mb={3}>
          <Text fontSize={1} mb={1}>
            Guests
          </Text>
          <PseudoHoverInput>
            <MultiMemberPickerField
              tabIndex="5"
              members={formik.values.members}
              setMembers={newMembers =>
                formik.setFieldValue("members", newMembers)
              }
            />
          </PseudoHoverInput>
        </Box>
      )}

      <Box mb={3}>
        <Text fontSize={1} mb={1}>
          Description
        </Text>
        <TextArea
          tabIndex="6"
          fontSize={2}
          value={formik.values.description}
          name="description"
          placeholder="Tell your guests what your event is about..."
          onChange={formik.handleChange}
          isDisabled={formik.isSubmitting}
        />
      </Box>

      <Box mb={3}>
        <Checkbox
          name="Allow guests to invite others"
          tabIndex="7"
          value={formik.values.guestsCanInvite}
          onChange={e =>
            formik.setFieldValue("guestsCanInvite", e.target.checked)
          }
          isDisabled={formik.isSubmitting}
          width="auto"
        />
      </Box>

      {isEditing && (
        <Box mb={3}>
          <Checkbox
            name="Resend invitations"
            value={formik.values.resend}
            onChange={e => formik.setFieldValue("resend", e.target.checked)}
            isDisabled={formik.isSubmitting}
            width="auto"
          />
        </Box>
      )}

      <Box mt={4}>
        <Button
          type="submit"
          tabIndex="8"
          onClick={formik.handleSubmit}
          isLoading={formik.isSubmitting}
        >
          {isEditing ? "Update event" : "Send invitations"}
        </Button>
      </Box>
    </Container>
  );
}
