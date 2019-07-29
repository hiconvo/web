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
      <Box as="section" mb={5}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
            Avatar
          </Heading>
          <UploadAvatarFormButton />
        </Box>
        <Box alignItems="center">
          <Avatar src={user.avatar} size="20rem" />
        </Box>
      </Box>

      <form onSubmit={handleUpdateUser}>
        <Box as="section" mb={5} pt={4}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
              Profile
            </Heading>
            <Button
              variant={hasMadeChanges ? "primary" : "tertiary"}
              onClick={handleUpdateUser}
              width="min-content"
            >
              <Icon name="save_alt" fontSize={4} mr={2} />
              <Text color="inherit">Save changes</Text>
            </Button>
          </Box>
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
      </form>

      <Box as="section" mb={5}>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Verification
        </Heading>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text mb={3} pt={3}>
            {user.verified ? "Email is verified" : "Email is not verified"}
          </Text>
          {!user.verified && (
            <Button
              variant="tertiary"
              onClick={sendVerifyEmail}
              width="min-content"
            >
              <Icon name="alternate_email" fontSize={4} mr={2} />
              <Text color="inherit">Resend veify email</Text>
            </Button>
          )}
        </Box>
      </Box>

      <Box as="section" mb={4}>
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb={1}>
          Password
        </Heading>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text>Password is set</Text>
          <Button
            variant="tertiary"
            onClick={sendResetPasswordEmail}
            width="min-content"
          >
            <Icon name="vpn_key" fontSize={4} mr={2} />
            <Text color="inherit">Reset password</Text>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
