import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import { getUser } from "../api/user";
import { Text, FloatingPill } from "./styles";
import { Container, Label, Input } from "./styles/CreateForm";
import Composer from "./Composer";
import MultiMemberPickerField from "./MultiMemberPickerField";
import { useActions } from "../redux";
import * as unboundActions from "../actions/threads";
import * as unboundGeneralActions from "../actions/general";
import * as unboundNotifActions from "../actions/notifications";

const Form = styled.form``;

function ThreadForm(props) {
  const subjectEl = useRef(null);
  const [subject, setSubject] = useState("");
  const [members, setMembers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const { createThread } = useActions(unboundActions);
  const { dispatchNotification } = useActions(unboundNotifActions);
  const { setSelectedResource } = useActions(unboundGeneralActions);

  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }

  async function handleSend(body) {
    if (body.length === 0) {
      return dispatchNotification({
        type: "ERROR",
        message: "Your message cannot be empty"
      });
    }

    if (members.length === 0) {
      return dispatchNotification({
        type: "ERROR",
        message: "You need to add at least one member"
      });
    }

    setIsDisabled(true);
    let thread;
    try {
      thread = await createThread({
        subject,
        users: members,
        body
      });
    } catch (e) {
      setIsDisabled(false);
      return;
    }

    setSelectedResource(thread.id);
    props.history.push("/convos");
  }

  useEffect(() => {
    subjectEl.current.focus();

    if (props.history.location && props.history.location.search) {
      const [, id] = props.history.location.search.match(/\?userId=(.+)/);
      getUser(id).then(user => setMembers([user]));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <FloatingPill>
        <Form>
          <Label>
            <Text fontSize={1} mr={1}>
              Subject:
            </Text>
            <Input
              type="text"
              placeholder="Give your Convo a subject"
              value={subject}
              onChange={handleSubjectChange}
              ref={subjectEl}
              required
              maxLength="255"
              fontSize={2}
            />
          </Label>

          <Label>
            <Text fontSize={1} mr={1}>
              To:
            </Text>
            <MultiMemberPickerField members={members} setMembers={setMembers} />
          </Label>

          <Composer
            placeholder="Compose your message..."
            backgroundColor="gray"
            height="16rem"
            onClick={handleSend}
            isDisabled={isDisabled}
          />
        </Form>
      </FloatingPill>
    </Container>
  );
}

export default withRouter(ThreadForm);
