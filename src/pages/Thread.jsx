import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Helmet } from "react-helmet";

import { useSelectors, useActions } from "../redux";
import { getThreadById, getIsThreadsFetched } from "../selectors";
import * as unboundThreadActions from "../actions/threads";
import { ContainerDualSidebars } from "./styles";
import ThreadViewer from "../components/ThreadViewer";
import ThreadInfoBox from "../components/ThreadInfoBox";
import {
  Text,
  Box,
  Ripple,
  CenterContent,
  Button,
  Icon
} from "../components/styles";
import { errorToString } from "../utils";

const Container = styled.div`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding: 0;
    max-width: 60rem;
    width: 100%;
    margin: 0 auto;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

const fetched = new Set();

export default function Thread() {
  const history = useHistory();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchThread } = useActions(unboundThreadActions);
  const [thread, isThreadsFetched] = useSelectors(
    getThreadById(id),
    getIsThreadsFetched
  );

  useEffect(() => {
    async function handleFetchThread() {
      if (id && !thread && isThreadsFetched && !fetched.has(id)) {
        try {
          await fetchThread(id);
        } catch (e) {
          setErrorMessage(errorToString(e));
        } finally {
          fetched.add(id);
        }
      } else if (id && thread) {
        fetched.add(id);
      }
    }

    handleFetchThread();
  }, [isThreadsFetched, id, fetchThread, thread]);

  if (!thread) {
    return (
      <CenterContent>
        <Box maxWidth="70rem" p={3}>
          {errorMessage ? (
            <Text fontSize={3} textAlign="center">
              {errorMessage}
            </Text>
          ) : (
            <Ripple />
          )}
        </Box>
      </CenterContent>
    );
  }

  return (
    <ContainerDualSidebars>
      <Helmet>
        <title>{"Convo | " + thread.subject}</title>
      </Helmet>
      <Box>
        <Box position="fixed" width="28rem">
          <Button
            onClick={() => history.push("/convos")}
            variant="gray"
            width="100%"
          >
            <Icon name="keyboard_backspace" mr={1} fontSize={3} />
            Go back
          </Button>
        </Box>
      </Box>
      <Container>
        <ThreadViewer thread={thread} />
      </Container>
      <Box>
        <Box position="fixed" width="28rem">
          <ThreadInfoBox thread={thread} />
        </Box>
      </Box>
    </ContainerDualSidebars>
  );
}
