import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "100px 20px",
      }}
    >
      <h1
        style={{
          color: "red",
          fontSize: "80px",
          fontWeight: "bold",
        }}
      >
        404
      </h1>

      <h3>Page Not Found</h3>

      <p>
        The page you are looking for does not exist.
      </p>

      <Button as={Link} to="/" variant="primary">
        Go to Home
      </Button>
    </div>
  );
};

export default Error;