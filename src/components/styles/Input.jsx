import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { typography } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

import Box from "./Box";
import { Text } from "./typography";

const inputStyles = css`
  ${typography}
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: 0.1rem solid ${themeGet("colors.lightGray")};
  outline: none;
  transition: border ease ${themeGet("animations.fast")};
  color: ${themeGet("colors.bodytext")};
  border-radius: 0.4rem;
  font-family: ${themeGet("fonts.sans")};
  height: 1.5em;

  &:hover {
    border: 0.1rem solid ${themeGet("colors.mediumGray")};
  }

  &:focus {
    border: 0.1rem solid ${themeGet("colors.darkGray")};
  }

  &::placeholder {
    color: ${themeGet("colors.mediumGray")};
  }

  ${props =>
    props.error &&
    `
    border: 0.1rem solid ${props.theme.colors.error};
  `}

`;

const GenericInput = styled.input`
  ${inputStyles}
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

export function Input({
  name = "",
  type = "text",
  value,
  error,
  onChange,
  fontSize,
  placeholder = "",
  required,
  maxLength = "",
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
      <GenericInput
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

export const TextArea = styled.textarea`
  ${inputStyles}
  width: calc(100% - 1.8rem);
  min-height: 18rem;
  line-height: 1.5em;
`;

export function Checkbox({
  name,
  value,
  handleChange,
  isError,
  error,
  required,
  ...rest
}) {
  return (
    <Box as="label" flexDirection="row" alignItems="center" {...rest}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        name={name.toLowerCase()}
        required={required}
      />
      {!!name && (
        <Text fontSize={1} ml={2}>
          {name}
        </Text>
      )}
      <Text fontSize={0} color="error">
        {isError && error}
      </Text>
    </Box>
  );
}
