import React, { useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import { format, parse } from "date-fns";

import { useActions, useSelectors } from "../redux";
import { getContacts } from "../selectors";
import * as unboundEventActions from "../actions/events";
import * as unboundGeneralActions from "../actions/general";
import MultiMemberPickerField from "./MultiMemberPickerField";
import Controls from "./MessageComposerControls";
import PlacePicker from "./PlacePicker";
import Map from "./Map";
import { theme, FloatingPill, Text, Box, Heading, Paragraph } from "./styles";
import MemberItemMedium from "./MemberItemMedium";

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

function EventForm(props) {
  const [contacts] = useSelectors(getContacts);
  const { createEvent, setSelectedResource } = useActions({
    ...unboundEventActions,
    ...unboundGeneralActions
  });

  const [name, setName] = useState("");
  const [messageValue, setMessageValue] = useState(nullValue);
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [place, setPlace] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleSend(e) {
    e.preventDefault();

    const description = Plain.serialize(messageValue);
    const datetime = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());

    setIsDisabled(true);
    let event;
    try {
      event = await createEvent({
        name,
        description,
        placeID: placeId,
        users: members,
        time: datetime.toISOString()
      });
    } catch (e) {
      setIsDisabled(false);
      return;
    }

    setSelectedResource(event.id);
    props.history.push("/convos");
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

            <Box>
              <Label>
                <Text fontSize={1} mr={1}>
                  Invitees:
                </Text>
                <MultiMemberPickerField
                  members={members}
                  setMembers={setMembers}
                />
              </Label>
            </Box>

            <Editor
              onChange={({ value }) => setMessageValue(value)}
              value={messageValue}
              placeholder="Tell your invitees what your event is about..."
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

            <Controls
              value={messageValue}
              onClick={handleSend}
              isDisabled={isDisabled}
            />
          </Form>
        </FloatingPill>
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <Heading fontSize={4} color="darkGray">
            Create an event
          </Heading>
          <Paragraph fontSize={1} color="gray" lineHeight="1.3em" mb={4}>
            Click on your contacts below to invite them to your event.
          </Paragraph>
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
        </Box>
      </Box>
    </OuterContainer>
  );
}

export default withRouter(EventForm);
