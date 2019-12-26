import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export default createGlobalStyle`
  .react-datepicker {
    font-family: unset;
    margin-bottom: 0.8rem;
  }

  .react-datepicker-wrapper input {
    padding: 0.8rem;
    margin: 0.4rem 0;
    border: 0.1rem solid ${theme.colors.lightGray};
    border-radius: 0.4rem;
    outline: none;
    transition: border ease ${theme.animations.fast};
    font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    width: calc(100% - 1.8rem);
    font-size: 1.6rem;
    height: 1.5em;
  }

  .react-datepicker-wrapper input:hover {
    border: 0.1rem solid ${theme.colors.mediumGray};
  }

  .react-datepicker-wrapper input:focus {
    border: 0.1rem solid ${theme.colors.darkGray};
  }

  .react-datepicker-popper {
    z-index: 5;
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range {
    background-color: #00bfa2;
  }
`;
