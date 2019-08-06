import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export default styled.div`
  border-radius: 100%;
  background-color: ${themeGet("colors.lightGray")};
  height: ${props => themeGet(props.size, props.size)(props)};
  width: ${props => themeGet(props.size, props.size)(props)};
  background-image: url(${props => props.src});
  background-position: center;
  background-size: contain;
  flex-shrink: 0;
`;
