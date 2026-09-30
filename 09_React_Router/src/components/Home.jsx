import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <h1 >
          Welcome to My Website
        </h1>

        <p >
          I have build modern and responsive web applications.
        </p>

        <Button variant="primary" className="mt-3">
          Our Services
        </Button>
      </div>
    </Container>
  );
};

export default Home;