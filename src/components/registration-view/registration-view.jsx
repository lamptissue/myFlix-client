import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import "./registration-view.scss";

export function RegistrationView(props) {
  // const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    // if (name) {
    //   setValues({ ...values, nameErr: "Name is required" });
    //   isReq = false;
    // }
    if (!username) {
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password Required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email Required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
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
          alert("unable to register");
        });
    }
  };

  return (
    <Row className='mt-5'>
      <Col md={12}>
        <Form>
          <h3>Sign Up</h3>
          <p></p>
          <Form.Group controlId='formUsername' className='reg-form-inputs'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>
          {/* <Form.Group controlId='formName' className='reg-form-inputs'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {values.nameErr && <p>{values.nameErr}</p>}
          </Form.Group> */}

          <Form.Group controlId='formPassword' className='reg-form-inputs'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>
          <Form.Group controlId='Email' className='reg-form-inputs'>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId='updateBirthday'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              name='birthday'
              onChange={(e) => setBirthday(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
          <p></p>
          <p>
            Already registered <Link to={"/"}>sign in</Link> here
          </p>
        </Form>
      </Col>
    </Row>
  );
}

{
  /* <Container className='registration'>
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
} */
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};
