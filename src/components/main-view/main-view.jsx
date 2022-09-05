import React from "react";
import axios from "axios";
import { Row, Col, Navbar, Container, Nav } from "react-bootstrap";

import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
// import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://lamptissue-movie-flix.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // if (!registered) return;
    // <RegistrationView
    //   onRegistration={(registered) => this.onRegistration(registered)}
    // />;
    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view' />;

    return (
      <div class='main-area bg-light'>
        <Navbar expand='lg' bg='warning'>
          <Container fluid>
            <Navbar.Brand href='#home'>MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='#home'>Home</Nav.Link>
                <Nav.Link href='#link'>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row className='main-view d-flex justify-content-center pb-5 px-3 pt-3'>
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3} sm={6} className='mb-4'>
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

export default MainView;
