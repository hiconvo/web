import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import UnstyledButton from "./UnstyledButton";

export default styled(UnstyledButton)`
  padding: ${themeGet("space.2")} ${themeGet("space.3")} ${themeGet("space.2")}
    ${themeGet("space.2")};
  border-radius: ${themeGet("radii.special")};
  background-color: transparent;
  transition: all ease 0.2s;
  color: ${themeGet("colors.gray")};
  display: flex;
  align-items: center;
  flex-direction: row;
  &:hover {
    background-color: ${themeGet("colors.veryLightGray")};
    color: ${themeGet("colors.bodytext")};
  }
`;
