import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - ${themeGet("headerHeight")} * 2);
  width: 100%;
`;
