import React, { useState } from "react";
import styled from "styled-components";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { getUser } from "../selectors";
import {
  Heading,
  TextInput,
  Box,
  Text,
  Button,
  Avatar,
  Icon
} from "../components/styles";
import UploadAvatarFormButton from "../components/UploadAvatarFormButton";

const Container = styled.main`
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
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const { updateUser, sendVerifyEmail, sendResetPasswordEmail } = useActions(
    unboundActions
  );

  const hasMadeChanges = [
    [email, user.email],
    [firstName, user.firstName],
    [lastName, user.lastName]
  ].some(([a, b]) => a !== b);

  function handleUpdateUser(e) {
    e.preventDefault();

    updateUser({
      email,
      firstName,
      lastName
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
          <TextInput
            name="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
          />
          <TextInput
            name="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextInput
            name="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Box>
      </Section>

      <Section>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Verification
        </Heading>
        <Group>
          <Text mb={3} pt={3}>
            {user.verified ? "Email is verified" : "Email is not verified"}
          </Text>
          {!user.verified && (
            <SettingsButton
              onClick={sendVerifyEmail}
              iconName="alternate_email"
              text="Resend verify email"
            />
          )}
        </Group>
      </Section>

      <Section>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Password
        </Heading>
        <Group>
          <Text mb={3} pt={3}>
            Password is set
          </Text>
          <SettingsButton
            onClick={sendResetPasswordEmail}
            iconName="vpn_key"
            text="Reset password"
          />
        </Group>
      </Section>
    </Container>
  );
}
