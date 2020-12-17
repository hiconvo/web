import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Icon, Text } from "./styles";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  background-color: ${(props) => themeGet(props.backgroundColor)(props)};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  font-size: ${themeGet("fontSizes.2")};
  text-align: center;
  color: ${themeGet("colors.darkGray")};
  padding: ${themeGet("space.3")};
  margin: ${themeGet("space.2")};
  transition: background-color 3s ease-in;
  opacity: 1;
`;

const colors = {
  NEUTRAL: "colors.lightyellow",
  ERROR: "colors.error100",
  SUCCESS: "colors.lightyellow"
};

const icons = {
  NEUTRAL: "info",
  ERROR: "error",
  SUCCESS: "check"
};

export default function Notification({ message, type = "NEUTRAL" }) {
  return (
    <Container backgroundColor={colors[type]} borderColor={colors[type]}>
      <Icon name={icons[type]} fontSize={4} mr={2} color="inherit" />
      <Text color="inherit">{message}</Text>
    </Container>
  );
}
