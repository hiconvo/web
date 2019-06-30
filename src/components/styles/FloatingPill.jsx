import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export default styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${themeGet("space.5")};
  padding: ${themeGet("space.4")} ${themeGet("space.4")} ${themeGet("space.2")}
    ${themeGet("space.4")};
  background-color: ${themeGet("colors.trueWhite")};
  box-shadow: ${themeGet("shadows.spread")};
  border-radius: ${themeGet("radii.special")};
  font-family: ${themeGet("fonts.serif")};
  font-size: ${themeGet("fontSizes.3")};
  line-height: 1.5em;
`;
