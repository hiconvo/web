import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const AutoCompleteInput = styled.input`
  padding: ${themeGet("space.2")};
  margin: ${themeGet("space.1")} 0;
  border: none;
  border-radius: ${themeGet("radii.small")};
  outline: none;
  font-family: ${themeGet("fonts.sans")};
  font-size: ${themeGet("fontSizes.2")};
  width: calc(100% - ${themeGet("space.2")} * 2);
  background-color: transparent;
`;

export const AutoCompleteDropDown = styled.ul`
  min-width: 16rem;
  background-color: ${themeGet("colors.trueWhite")};
  border-radius: ${themeGet("radii.normal")};
  box-shadow: ${themeGet("shadows.normal")};
  padding: ${themeGet("space.2")} 0;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: all ease ${themeGet("animations.fast")};
  transform: ${props =>
    props.isOpen ? "translateY(0rem)" : "translateY(-1rem)"};
  opacity: ${props => (props.isOpen ? "1" : "0")};
  z-index: 30;
`;

export const AutoCompleteItem = styled.button`
  padding: ${themeGet("space.2")} ${themeGet("space.3")};
  font-size: ${themeGet("fontSizes.2")};
  background: inherit;
  border: none;
  font-family: inherit;
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus,
  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
  }
`;
