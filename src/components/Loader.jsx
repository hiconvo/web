import styled, { keyframes } from "styled-components";
import { themeGet } from "styled-system";

const load3 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default styled.div`
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${themeGet("colors.mediumGray")};
  background: linear-gradient(
    to right,
    ${themeGet("colors.mediumGray")} 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: ${load3} 1.4s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: ${themeGet("colors.mediumGray")};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &:after {
    background: #fafafa;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;
