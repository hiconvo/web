import React, { useState } from "react";
import { Editor } from "slate-react";
import Plain from "slate-plain-serializer";
import styled from "styled-components";
import { themeGet } from "styled-system";

import { Box, Text, Button, Icon } from "./styles";
import { useActions, useSelectors } from "../redux";
import { getSelectedThread } from "../selectors";
import * as unboundActions from "../actions/messages";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet("space.5")};
  padding: ${themeGet("space.4")} ${themeGet("space.4")} ${themeGet("space.2")}
    ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  box-shadow: ${themeGet("shadows.spread")};
  border-radius: ${themeGet("radii.special")};
  font-family: ${themeGet("fonts.serif")};
  font-size: ${themeGet("fontSizes.3")};
  line-height: 1.5em;
`;

const nullValue = Plain.deserialize("");

function Controls({ value, onClick }) {
  const wordCount = Plain.serialize(value)
    .trim()
    .split(/\s+/).length;
  const estimate = (wordCount / 300).toFixed(1);
  const min = estimate === (1).toFixed(1) ? "minute" : "minutes";
  return (
    <Box justifyContent="space-between" alignItems="center" flexDirection="row">
      <Text
        fontFamily="sans"
        fontSize={0}
        color="lightGray"
        display="inline-block"
      >
        About {estimate} {min} to read
      </Text>
      <Button
        onClick={onClick}
        variant="brand"
        width="8rem"
        fontSize={[2]}
        mb="0"
        pr="0"
      >
        Send <Icon name="send" ml={1} fontSize="2.0rem" />
      </Button>
    </Box>
  );
}

export default function Composer() {
  const [currentValue, setValue] = useState(nullValue);
  const [{ id: threadId }] = useSelectors(getSelectedThread);
  const { createMessage } = useActions(unboundActions);

  function handleChange({ value }) {
    setValue(value);
  }

  async function handleSend() {
    try {
      await createMessage(threadId, { body: Plain.serialize(currentValue) });
    } catch (e) {
      return e;
    }

    setValue(nullValue);
  }

  return (
    <Container>
      <Editor
        onChange={handleChange}
        value={currentValue}
        placeholder="Compose your response..."
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <Controls value={currentValue} onClick={handleSend} />
    </Container>
  );
}
