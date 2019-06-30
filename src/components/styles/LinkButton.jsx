import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

function LinkButton({ to, children, ...rest }) {
  return (
    <Button {...rest}>
      <Link
        to={to}
        style={{
          width: "inherit",
          height: "inherit",
          display: "inherit",
          position: "inherit",
          textAlign: "inherit",
          alignItems: "inherit",
          justifyContent: "inherit"
        }}
      >
        {children}
      </Link>
    </Button>
  );
}

LinkButton.defaultProps = {
  variant: "tertiary",
  textAlign: "left"
};

export default LinkButton;
