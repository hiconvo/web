import styled from "styled-components";
import { margin, padding } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

export const Container = styled.div`
  display: block;
  padding: 0 ${themeGet("space.5")};

  ${themeGet("media.tablet")} {
    padding-left: ${themeGet("space.5")};
    padding-right: 0;
  }

  ${themeGet("media.phone")} {
    padding: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  ${margin}
  ${padding}
`;

export const Input = styled.input`
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  width: ${props => props.width || "100%"};
  height: 3.6rem;
  font-size: ${props => themeGet(`fontSizes.${props.fontSize}`)(props)};
`;
