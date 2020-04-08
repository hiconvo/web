import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import Button from "./Button";

function LinkButton({ to, children, preserveQuery, ...rest }) {
  const { search } = useLocation();

  return (
    <Link to={{ pathname: to, search: preserveQuery ? search : "" }}>
      <Button as="div" {...rest}>
        {children}
      </Button>
    </Link>
  );
}

LinkButton.defaultProps = {
  variant: "tertiary",
  textAlign: "left"
};

export default LinkButton;
