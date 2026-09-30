import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Service = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Our Services</h1>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Frontend Development</Card.Title>
              <Card.Text>
                I have build responsive and user-friendly frontend websites.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Backend Development</Card.Title>
              <Card.Text>
                I have develop secure and scalable backend applications.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Full Stack Development</Card.Title>
              <Card.Text>
                I have create complete web applications using modern technologies.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Service;