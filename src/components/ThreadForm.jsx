import React, { useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";

import { theme, Text, FloatingPill } from "./styles";
import Controls from "./ComposerControls";
import MemberPicker from "./MemberPicker";

const Container = styled.main`
  display: block;
  padding: 0 ${themeGet("space.5")};
`;

const Form = styled.form``;

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
`;

const nullValue = Plain.deserialize("");

export default function ThreadForm() {
  const [messageValue, setMessageValue] = useState(nullValue);
  const [subject, setSubject] = useState("");
  const [members, setMembers] = useState([]);

  function handleMessageChange({ value }) {
    setMessageValue(value);
  }

  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }

  function handleSend() {}

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
              value={subject}
              onChange={handleSubjectChange}
              required
              maxLength="255"
            />
          </Label>
          <Label>
            <Text fontSize={1} mr={1}>
              To:
            </Text>
            <MemberPicker members={members} setMembers={setMembers} />
          </Label>

          <Editor
            onChange={handleMessageChange}
            value={messageValue}
            placeholder="Compose your message..."
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
          <Controls value={messageValue} onClick={handleSend} />
        </Form>
      </FloatingPill>
    </Container>
  );
}
