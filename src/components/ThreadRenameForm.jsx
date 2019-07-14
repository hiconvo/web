import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { useActions } from "../redux";
import { Paragraph } from "./styles";
import * as unboundNotificationActions from "../actions/notifications";
import * as unboundThreadActions from "../actions/threads";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet("space.4")};
`;

const Label = styled.label`
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.0")};
  color: ${themeGet("colors.gray")};
  margin-bottom: ${themeGet("space.2")};
`;

const Input = styled.input`
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.4")};
  border: 0.2rem solid ${themeGet("colors.primary300")};
  border-radius: 0.4rem;
  margin-left: calc(0.2rem + ${themeGet("space.2")} * -1);
  margin-bottom: ${themeGet("space.2")};
  padding: ${themeGet("space.2")};
  outline: none;
  line-height: ${themeGet("title")};
  box-shadow: ${themeGet("shadows.normal")};
  background-color: ${props => props.background};
  transition: background-color ease ${themeGet("animations.lazy")};
`;

export default function ThreadRenameForm({ thread, onBlur }) {
  const subjectEl = useRef(null);
  const [subject, setSubject] = useState(thread.subject);
  const [inputBackground, setInputBackground] = useState("lightyellow");
  const { dispatchNotification, updateThread } = useActions({
    ...unboundNotificationActions,
    ...unboundThreadActions
  });

  async function handleSubmit(e) {
    e && e.preventDefault();

    try {
      await updateThread({ id: thread.id, subject });
      dispatchNotification({ type: "SUCCESS", message: "Changed subject" });
      onBlur();
    } catch (e) {
      dispatchNotification({ type: "ERROR", message: e.getPayload().message });
    }
  }

  function handleFocus(e) {
    e.target.select();
  }

  useEffect(() => {
    subjectEl.current.focus();
    setInputBackground("white");
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="subject">Subject</Label>
      <Input
        id="subject"
        type="text"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        maxLength={255}
        background={inputBackground}
        ref={subjectEl}
        onBlur={handleSubmit}
        onFocus={handleFocus}
        required
      />
      <Paragraph fontSize={1} color="gray" lineHeight="1.3em">
        Press enter, tab, or click away to save.
      </Paragraph>
    </Form>
  );
}
