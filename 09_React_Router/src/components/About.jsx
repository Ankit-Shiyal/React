import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">About Us</h1>

      <p className="text-center text-secondary">
        I am a web developer focused on building
        simple, modern and responsive websites.
      </p>
    </Container>
  );
};

export default About;