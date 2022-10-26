import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Card,
  Container,
  CardGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

import "./registration-view.scss";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr(<span style={{ color: "red" }}>Username Required</span>);
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr(
        <span style={{ color: "red" }}>
          Username must have at least 2 characters
        </span>
      );
      isReq = false;
    }
    if (!password) {
      setPasswordErr(<span style={{ color: "red" }}>Password Required</span>);
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr(
        <span style={{ color: "red" }}>
          Password must have at least 6 characters
        </span>
      );
      isReq = false;
    }
    if (!email) {
      setEmailErr(<span style={{ color: "red" }}>Email Required</span>);
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr(
        <span style={{ color: "red" }}>Please enter correct email address</span>
      );
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://lamptissue-movie-flix.herokuapp.com/users", {
          username: username,
          password: password,
          email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login");
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("Unable to register");
        });
    }
  };

  return (
    <Container className='registration'>
      <Row>
        <Col className='d-flex justify-content-center '>
          <Card className='cardWidth'>
            <Card.Body>
              <Card.Title className='text-center mb-4'>Sign Up</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label className='mt-2'>Username:</Form.Label>
                  <Form.Control
                    id='round-form'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter a username'
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mt-2'>Password:</Form.Label>
                  <Form.Control
                    id='round-form'
                    placeholder='Enter password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mt-2'>Email:</Form.Label>
                  <Form.Control
                    id='round-form'
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mt-2'>Birthday:</Form.Label>
                  <Form.Control
                    id='round-form'
                    type='date'
                    name='birthday'
                    placeholder='DD/MM/YYYY'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <div className='d-grid gap-2 mt-4'>
                  <Button
                    className='d-flex justify-content-center'
                    variant='primary'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </div>
                <p></p>
                Already registered? <br />
                <Button href={"/"} className='mt-3'>
                  Sign in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
