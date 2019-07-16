import styled, { keyframes } from "styled-components";
import { space } from "styled-system";
import { themeGet } from "@styled-system/theme-get";

const load8 = keyframes`
  0% {
	  transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.div`
  ${space}
  font-size: 0.4rem;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid
    ${props => themeGet("colors." + props.color, "#ffffff")(props)};
  transform: translateZ(0);
  animation: ${load8} 1.1s infinite linear;
  border-radius: 50%;
  width: ${props => props.size || "4rem"};
  height: ${props => props.size || "4rem"};

  &:after {
    border-radius: 50%;
    width: ${props => props.size || "4rem"};
    height: ${props => props.size || "4rem"};
  }
`;

Spinner.defaultProps = {
  mx: "auto",
  my: 0
};

export default Spinner;
