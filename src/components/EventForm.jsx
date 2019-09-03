import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import { format } from "date-fns";

import MultiMemberPickerField from "./MultiMemberPickerField";
import PlacePicker from "./PlacePicker";
import { theme, FloatingPill, Text, Box } from "./styles";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: ${themeGet("space.1")};
  width: 100%;
`;

const Input = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  width: 100%;
  font-size: ${props => themeGet(`fontSizes.${props.fontSize}`)(props)};
`;

const Form = styled.form``;

const nullValue = Plain.deserialize("");

export default function EventForm() {
  const [name, setName] = useState("");
  const [messageValue, setMessageValue] = useState(nullValue);
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState(format(new Date(), "YYYY-MM-DD"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [place, setPlace] = useState("");
  const [placeId, setPlaceId] = useState("");

  return (
    <Container>
      <FloatingPill>
        <Form>
          <Box>
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
                fontSize={3}
                placeholder="My great event"
              />
            </Label>
          </Box>

          <Box flexDirection="row">
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

          <Box flexDirection="row">
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
          </Box>

          <Label>
            <Text fontSize={1} mr={1}>
              Invitees:
            </Text>
            <MultiMemberPickerField members={members} setMembers={setMembers} />
          </Label>

          <Editor
            onChange={({ value }) => setMessageValue(value)}
            value={messageValue}
            placeholder="Describe your event..."
            style={{
              width: `calc(100% - ${theme.space[3]} * 2)`,
              marginBottom: "1rem",
              backgroundColor: theme.colors.snow,
              border: `0.1rem solid ${theme.colors.veryLightGray}`,
              borderRadius: theme.radii.normal,
              padding: theme.space[3],
              minHeight: "16rem",
              marginTop: theme.space[3]
            }}
          />
        </Form>
      </FloatingPill>
    </Container>
  );
}
