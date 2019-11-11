import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .react-datepicker {
    font-family: unset;
  }

  .react-datepicker-wrapper input {
    padding: 0.8rem;
    margin: 0.4rem 0;
    border: none;
    border-radius: 0.4rem;
    outline: none;
    font-family: "Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    width: auto;
    font-size: 1.6rem;
  }

  .react-datepicker-popper {
    z-index: 5;
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range {
    background-color: #00bfa2;
  }
`;
