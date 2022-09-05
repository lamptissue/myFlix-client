import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <Container className='registration'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <CardGroup className='login-signup'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Login</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername' className='mb-3'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId='formPassword' className='mb-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
