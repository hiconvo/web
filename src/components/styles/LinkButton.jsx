import React from "react";
import { useLocation, useHistory } from "react-router";

import Button from "./Button";

function LinkButton({ to, children, preserveQuery, ...rest }) {
  const { search } = useLocation();
  const history = useHistory();

  const dest = preserveQuery ? to + search : to;

  function handleClick(e) {
    e.preventDefault();
    history.push(dest);
  }

  return (
    <Button as="a" href={to} onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
}

LinkButton.defaultProps = {
  variant: "tertiary",
  textAlign: "left"
};

export default LinkButton;
