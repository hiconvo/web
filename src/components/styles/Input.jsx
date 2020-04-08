import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import Box from "./Box";
import { Text } from "./typography";

const inputStyles = css`
  transition: border ease ${themeGet("animations.fast")};

  &:hover {
    border: 0.1rem solid ${themeGet("colors.mediumGray")};
  }

  &:focus {
    border: 0.1rem solid ${themeGet("colors.darkGray")};
  }

  &::placeholder {
    color: ${themeGet("colors.mediumGray")};
  }

  ${(props) =>
    props.error &&
    `
    border: 0.1rem solid ${props.theme.colors.error};
  `}
`;

const GenericInput = styled(Box)`
  ${inputStyles}
`;

GenericInput.defaultProps = {
  as: "input",
  display: "block",
  flexDirection: "unset",
  p: 2,
  my: 1,
  border: "lightGray",
  borderRadius: "0.4rem",
  color: "bodytext",
  height: "4.2rem",
  lineHeight: "1.5em"
};

const Label = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: ${themeGet("space.1")} 0;
`;

Label.defaultProps = {
  mb: 2,
  as: "label"
};

const Input = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
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
      <Label>
        {!!name && <Text fontSize={1}>{name}</Text>}
        <GenericInput
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          fontSize={fontSize || 3}
          name={name.toLowerCase()}
          error={isError}
          placeholder={placeholder}
          required={required}
          maxlength={maxLength}
          {...rest}
        />
        <Text fontSize={0} color="error">
          {isError && error}
        </Text>
      </Label>
    );
  }
);

const TextArea = styled(Box)`
  ${inputStyles}
  min-height: 18rem;
`;

TextArea.defaultProps = {
  as: "textarea",
  p: 2,
  my: 1,
  border: "lightGray",
  borderRadius: "0.4rem",
  color: "bodytext",
  lineHeight: "1.5em"
};

function Checkbox({
  name,
  value,
  onChange,
  isError,
  error,
  required,
  tabIndex,
  ...rest
}) {
  return (
    <Box as="label" flexDirection="row" alignItems="center" {...rest}>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        name={name.toLowerCase()}
        required={required}
        tabIndex={tabIndex}
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

export { Input, Checkbox, TextArea };
