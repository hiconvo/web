import React, { useState } from "react";
import styled from "styled-components";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { getUser } from "../selectors";
import { Heading, TextInput, Box, Text, Button } from "../components/styles";

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
      <form onSubmit={handleUpdateUser}>
        <Box as="section" mb={4} pt={4}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Heading as="h2" fontSize={3} fontWeight="semiBold" mb={1}>
              Profile
            </Heading>
            <Button width="min-content">Save changes</Button>
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
      <Box as="section" mb={4}>
        <Heading as="h2" fontSize={3} fontWeight="semiBold" mb={1}>
          Verification
        </Heading>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text mb={3}>
            {user.verifed ? "Email is verified" : "Email is not verified"}
          </Text>
          {!user.verified && (
            <Button width="min-content" onClick={sendVerifyEmail}>
              Resend veify email
            </Button>
          )}
        </Box>
      </Box>
      <Box as="section" mb={4}>
        <Heading as="h2" fontSize={3} fontWeight="semiBold" mb={1}>
          Password
        </Heading>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text>Password is set</Text>
          <Button width="min-content" onClick={sendResetPasswordEmail}>
            Reset password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
