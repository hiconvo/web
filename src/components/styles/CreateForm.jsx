import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Container = styled.main`
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
  margin-bottom: ${themeGet("space.1")};
  width: 100%;
`;

export const Input = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  width: 100%;
  font-size: ${props => themeGet(`fontSizes.${props.fontSize}`)(props)};
`;
