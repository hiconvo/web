import React, { useState } from "react";
import styled from "styled-components";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { getUser } from "../selectors";
import {
  Heading,
  Input,
  Box,
  Text,
  Button,
  Avatar,
  Icon,
  Checkbox
} from "../components/styles";
import UploadAvatarFormButton from "../components/UploadAvatarFormButton";
import EmailSettings from "../components/EmailSettings";

import googleLogo from "../media/google-logo.svg";
import facebookLogo from "../media/facebook-logo.svg";

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 46rem;
`;

const SettingsHeading = ({ children }) => (
  <Heading as="h2" fontSize={4} fontWeight="semiBold" mb="0">
    {children}
  </Heading>
);

const Group = ({ children }) => (
  <Box
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    mb={4}
  >
    {children}
  </Box>
);

const Section = ({ children }) => (
  <Box as="section" mb={5}>
    {children}
  </Box>
);

const SettingsButton = ({ iconName, text, onClick, variant = "tertiary" }) => (
  <Button variant={variant} onClick={onClick} width="min-content" mb="0" p="0">
    <Icon name={iconName} fontSize={4} mr={2} />
    <Text color="inherit">{text}</Text>
  </Button>
);

export default function Settings() {
  const [user] = useSelectors(getUser);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [sendDigest, setSendDigest] = useState(user.sendDigest);
  const [sendEvents, setSendEvents] = useState(user.sendEvents);
  const { updateUser, sendResetPasswordEmail } = useActions(unboundActions);

  const hasMadeChanges = [
    [firstName, user.firstName],
    [lastName, user.lastName]
  ].some(([a, b]) => a !== b);

  const hasMadeEmailChanges = [
    [sendDigest, user.sendDigest],
    [sendEvents, user.sendEvents]
  ].some(([a, b]) => a !== b);

  function handleUpdateUser(e) {
    e.preventDefault();

    updateUser({
      firstName,
      lastName
    });
  }

  function handleUpdateEmailSettings(e) {
    e.preventDefault();

    updateUser({
      sendDigest,
      sendEvents
    });
  }

  return (
    <Container>
      <Section>
        <Group>
          <SettingsHeading>Avatar</SettingsHeading>
          <UploadAvatarFormButton />
        </Group>
        <Box alignItems="center" mb={2}>
          <Avatar src={user.avatar} size="20rem" />
        </Box>
      </Section>

      <Section>
        <Box as="form" onSubmit={handleUpdateUser}>
          <Group>
            <Heading as="h2" fontSize={4} fontWeight="semiBold" mb="0">
              Profile
            </Heading>
            <SettingsButton
              onClick={handleUpdateUser}
              iconName="save_alt"
              text="Save changes"
              variant={hasMadeChanges ? "brand" : "tertiary"}
            />
          </Group>
          <Input
            name="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            name="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
      </Section>

      <EmailSettings />

      <Section>
        <Box as="form" onSubmit={handleUpdateEmailSettings}>
          <Group>
            <Heading as="h2" fontSize={4} fontWeight="semiBold" mb="0">
              Emails you receive
            </Heading>
            <SettingsButton
              onClick={handleUpdateEmailSettings}
              iconName="save_alt"
              text="Save changes"
              variant={hasMadeEmailChanges ? "brand" : "tertiary"}
            />
          </Group>
          <Box mb={3}>
            <Checkbox
              value={sendDigest}
              onChange={() => setSendDigest(!sendDigest)}
              name="Digest"
            />
          </Box>
          <Box>
            <Checkbox
              value={sendEvents}
              onChange={() => setSendEvents(!sendEvents)}
              name="Event invitations & cancellations"
            />
          </Box>
        </Box>
      </Section>

      <Section>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Password
        </Heading>
        <Group>
          <Text mb={3} pt={3}>
            {user.isPasswordSet ? "Password is set" : "Password is not set"}
          </Text>
          <SettingsButton
            onClick={sendResetPasswordEmail}
            iconName="vpn_key"
            variant="tertiary"
            text={user.isPasswordSet ? "Reset password" : "Set password"}
          />
        </Group>
      </Section>

      <Section>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Connected accounts
        </Heading>
        <Box pt={3} flexDirection="row" alignItems="center" mb={4}>
          <Box as="img" src={googleLogo} width="2.2rem" mr={2} />
          <Text>
            Google account {user.isGoogleLinked ? "is" : "is not"} connected
          </Text>
        </Box>
        <Box flexDirection="row" alignItems="center" mb={4}>
          <Box as="img" src={facebookLogo} width="2.2rem" mr={2} />
          <Text>
            Facebook account {user.isFacebookLinked ? "is" : "is not"} connected
          </Text>
        </Box>
      </Section>
    </Container>
  );
}
