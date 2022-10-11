import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log("this.props", this.props);
  }

  getUser = () => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://lamptissue-movie-flix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          Password: response.data.password,
          Email: response.data.email,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://lamptissue-movie-flix.herokuapp.com/users/${username}`,
        {
          username: this.state.username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("response", response);
        alert("Profile was successfully updated");
        this.setState({
          username: response.data.username,
          Password: response.data.password,
          Email: response.data.email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", data.username);

        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser = (e) => {
    const confirmDelete = window.confirm("Confirm to remove :(");

    if (confirmDelete) {
      const username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios
        .delete(
          `https://lamptissue-movie-flix.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Profile successfully deleted");
          window.location.pathname = "/";
        })
        .catch((e) => {
          console.log(error);
        });
    }
  };
  removeFavoriteMovie = (e) => {
    // e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://lamptissue-movie-flix.herokuapp.com/users/${username}/movies/${movie}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirth(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, user } = this.props;
    const { FavouriteMovies, Email, Birthday } = this.state;

    const favoriteMovie = FavouriteMovies.map((movieId) =>
      movies.find((movie) => movie._id === movieId)
    );

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <h3>Username: {user}</h3>
                </Card.Title>
                <br />
                <Card.Text>{Email}</Card.Text>
                <Card.Text>Birthday: {Birthday}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className='mt-5'>
              <Card.Body>
                <Card.Title className='mb-4'>
                  <h4>Update your details</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Form>
          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              name='Username'
              placeholder={this.state.username}
              onChange={(e) => this.setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='Password'
              placeholder='New Password'
              onChange={(e) => this.setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='Email'
              placeholder={this.state.Email}
              onChange={(e) => this.setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4' controlId='formBirth'>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type='date'
              name='Birth'
              placeholder={this.state.Birth}
              onChange={(e) => this.setBirth(e.target.value)}
            />
          </Form.Group>

          <Button
            variant='outline-danger'
            type='submit'
            className='mr-2'
            onClick={this.updateUser}
          >
            Update Profile
          </Button>
          <h1>Favourite Movies</h1>
          <Row className='favorite-movies'>
            {/*Under created a logic to generate the movies*/}
            {favoriteMovie.map((movie) => (
              <li key={movie._id}>{movie.Title}</li>
            ))}
            <Row>
              <Button
                variant='outline-danger'
                onClick={(e) => {
                  this.removeFavoriteMovie();
                }}
              >
                Remove
              </Button>
            </Row>
          </Row>
          <h4>Unhappy?</h4>
          <Button
            variant='outline-danger'
            type='submit'
            className='mr-2'
            onClick={this.deleteUser}
          >
            Delete Profile
          </Button>
        </Form>
      </Container>
    );
  }
}
