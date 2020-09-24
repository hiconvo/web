import React, { useState } from "react";
import Modal from "styled-react-modal";

import Composer, {
  getInitialEditorState
  // getTextFromEditorState
} from "../components/Composer";
import { Box, LinkButton, Icon, Text } from "../components/styles";

const StyledModel = Modal.styled`
  background-color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export default function NewNote() {
  const [body, setBody] = useState(getInitialEditorState(""));

  return (
    <StyledModel isOpen={true}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={[0, 3]}
        p={[4, 5]}
      >
        <LinkButton variant="action" to="/links">
          <Icon name="chevron_left" mr={2} />
          <Text color="inherit">Back</Text>
        </LinkButton>
        <Box>
          <Text color="gray">Not saved</Text>
        </Box>
      </Box>

      <Box width="70rem" maxWidth="100%" mx="auto">
        <Box p={4}>
          <Composer
            editorState={body}
            onChange={setBody}
            placeholder="Once upon a time and a very good time it was there was a moocow coming down along the road and this moocow that was coming down along the road met a nicens little boy named baby tuckoo.... His father told him that story: his father looked at him through a glass: he had a hairy face. He was baby tuckoo. The moocow came down the road where Betty Byrne lived: she sold lemon platt."
            height="50rem"
          />
        </Box>
      </Box>
    </StyledModel>
  );
}
