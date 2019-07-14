import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import { Icon } from "./styles";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  background-color: ${props => themeGet(props.backgroundColor)(props)};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  font-size: ${themeGet("fontSizes.2")};
  color: ${themeGet("colors.gray")};
  padding: ${themeGet("space.3")};
  margin: ${themeGet("space.2")} auto;
  transition: background-color ${themeGet("animations.lazy")} ease,
    opacity ${themeGet("animations.fast")} ease,
    transform ${themeGet("animations.fast")} ease;
  transform: ${props =>
    props.isVisible ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isVisible ? "1" : "0")};
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
  const [bgColor, setBgColor] = useState(colors[type]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setBgColor("colors.trueWhite"));
    setTimeout(() => setIsVisible(true));
    setTimeout(() => setIsVisible(false), 3800);
  }, []);

  return (
    <Container
      backgroundColor={bgColor}
      isVisible={isVisible}
      borderColor={colors[type]}
    >
      <Icon name={icons[type]} fontSize={4} mr={2} color="inherit" />
      <span>{message}</span>
    </Container>
  );
}
