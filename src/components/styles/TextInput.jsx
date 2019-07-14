import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { typography } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

import Box from "./Box";
import { Text } from "./typography";

const Input = styled.input`
  ${typography}
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  outline: none;
  transition: border ease ${themeGet("animations.fast")};
  color: ${themeGet("colors.bodytext")};
  border-radius: 0.4rem;
  font-family: ${themeGet("fonts.sans")};

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
  mb: 2,
  as: "label"
};

function TextInput({
  name = "",
  value,
  error,
  type,
  onChange,
  fontSize,
  placeholder,
  required,
  maxLength,
  ...rest
}) {
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
    <Label {...rest}>
      {!!name && <Text fontSize={1}>{name}</Text>}
      <Input
        type={type}
        value={value}
        onChange={handleChange}
        fontSize={fontSize || 3}
        name={name.toLowerCase()}
        error={isError}
        placeholder={placeholder}
        required={required}
        maxlength={maxLength}
      />
      <Text fontSize={0} color="error">
        {isError && error}
      </Text>
    </Label>
  );
}

TextInput.defaultProps = {
  type: "text",
  placeholder: "",
  maxLength: ""
};

export default TextInput;
