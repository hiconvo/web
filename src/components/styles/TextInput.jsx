import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { themeGet } from "styled-system";

import Box from "./Box";
import { Text } from "./typography";

const Input = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  outline: none;
  transition: border ease ${themeGet("animations.fast")};
  font-size: ${themeGet("fontSizes.3")};
  color: ${themeGet("colors.bodytext")};
  border-radius: 0.4rem;

  &:hover {
    border: 0.1rem solid ${themeGet("colors.mediumGray")};
  }

  &:focus {
    border: 0.1rem solid ${themeGet("colors.darkGray")};
  }

  ${props =>
    props.error &&
    `
    border: 0.1rem solid ${props.theme.colors.error};
  `}
`;

const Label = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${themeGet("space.1")} 0;
`;

Label.defaultProps = {
  mb: 2
};

function TextInput({ name, value, error, type, onChange, ...rest }) {
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    e.persist();
    setIsError(false);
    onChange(e);
  }

  useEffect(() => {
    error && setIsError(true);
  }, [error]);

  return (
    <Label as="label" {...rest}>
      <Text fontSize={1}>{name}</Text>
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        name={name.toLowerCase()}
        error={isError}
      />
      <Text fontSize={0} color="error">
        {isError && error}
      </Text>
    </Label>
  );
}

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;
