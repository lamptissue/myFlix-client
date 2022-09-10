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
import PropTypes from "prop-types";
import axios from "axios";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    // props.onLoggedIn(username);
  };

  axios
    .post("https://lamptissue-movie-flix.herokuapp.com/users", {
      username: username,
      password: password,
      Email: email,
      Birthday: birthday,
    })
    .then((response) => {
      const data = response.data;
      console.log(data);
      window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch((e) => {
      console.log("error registering the user");
    });

  return (
    <Container className='registration'>
      <Row>
        <Col className='d-flex justify-content-center'>
          <CardGroup className='login-signup'>
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>Please Register</Card.Title>
                <Form>
                  <Form.Group controlId='formUsername' className='mb-3'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder='Enter a username'
                    />
                  </Form.Group>

                  <Form.Group controlId='formPassword' className='mb-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Min 8 characters'
                      minLength='8'
                    />
                  </Form.Group>

                  <Form.Group controlId='formEmail' className='mb-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address'
                    />
                  </Form.Group>

                  <Form.Group controlId='formBirthday' className='mb-3'>
                    <Form.Label>Date of birth:</Form.Label>
                    <Form.Control
                      type='date'
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder='Enter your birth date'
                    />
                  </Form.Group>
                  <Button
                    variant='primary'
                    type='submit'
                    onClick={handleSubmit}
                    className='mb-3'
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
RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
};
