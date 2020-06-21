import React, { useState } from "react";

import { useSelectors, useActions } from "../redux";
import * as unboundActions from "../actions/user";
import { getUser } from "../selectors";
import {
  Heading,
  Input,
  Box,
  Text,
  Paragraph,
  Button,
  Icon
} from "../components/styles";

const SettingsButton = ({ iconName, text, onClick, variant = "tertiary" }) => (
  <Button variant={variant} onClick={onClick} width="min-content" mb="0" p="0">
    <Icon name={iconName} fontSize={4} mr={2} />
    <Text color="inherit">{text}</Text>
  </Button>
);

export default function EmailSettings() {
  const [user] = useSelectors(getUser);
  const {
    sendVerifyEmail,
    addEmail,
    removeEmail,
    makeEmailPrimary
  } = useActions(unboundActions);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmitEmail(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      await addEmail({ email });
      setEmail("");
      setShowEmailForm(false);
    } catch (e) {}
    setIsLoading(false);
  }

  async function handleRemoveEmail(email) {
    await removeEmail({ email });
  }

  async function handleMakeEmailPrimary(email) {
    await makeEmailPrimary({ email });
  }

  return (
    <Box as="section" mb={5}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Heading as="h2" fontSize={4} fontWeight="semiBold" mb="0">
          Email
        </Heading>
        <SettingsButton
          onClick={() => setShowEmailForm(true)}
          iconName="add"
          text="Add email"
          variant="tertiary"
        />
      </Box>
      <Box as="ul">
        {showEmailForm && (
          <li>
            <Box as="form" mb={5}>
              <Input
                name="Email"
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={handleSubmitEmail}
                alignSelf="flex-end"
                isLoading={isLoading}
                width="15rem"
              >
                Submit
              </Button>
            </Box>
          </li>
        )}
        {!!user.emails &&
          user.emails.map((email) => (
            <Box as="li" mb={3} key={email}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                overflow="hidden"
              >
                <Paragraph
                  mb={2}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  <Text>{email}</Text>
                  <Text color="gray">
                    {email === user.email && " (Primary)"}
                  </Text>
                </Paragraph>
                <Box flexDirection="row">
                  {email !== user.email && (
                    <React.Fragment>
                      <Button
                        variant="secondary"
                        p={2}
                        mr={2}
                        onClick={() => handleMakeEmailPrimary(email)}
                      >
                        Set as primary
                      </Button>
                      <Button
                        variant="secondary"
                        p={2}
                        onClick={() => handleRemoveEmail(email)}
                      >
                        Remove
                      </Button>
                    </React.Fragment>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        {(!user.emails ||
          !user.emails.some((email) => email === user.email)) && (
          <Box as="li" flexDirection="row" justifyContent="space-between">
            <Text>{user.email}</Text>
            <SettingsButton
              onClick={sendVerifyEmail}
              iconName="alternate_email"
              text="Resend verify email"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
