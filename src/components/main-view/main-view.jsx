import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Row, Col, Container } from "react-bootstrap";
import { Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { setMovies } from "../../actions/actions";

import MoviesList from "../movies-list/movies-list";
import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Menubar } from "../navbar/navbar";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get("https://lamptissue-movie-flix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;
    return (
      <Router>
        <Menubar user={user} />
        <Container>
          <Row className='main-view d-flex justify-content-center pb-5 px-3 pt-3'>
            <Route
              exact
              path='/'
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path='/register'
              render={() => {
                if (user) return <Redirect to='/' />;
                return (
                  <Col lg={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path={`/users/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to='/' />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path='/movies/:id'
              render={({ match, history }) => {
                return (
                  <Col className='pt-4'>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.id)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path='/genres/:name'
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={8}>
                    <GenreView
                      genreMovies={movies.filter(
                        (movie) => movie.Genre.Name === match.params.name
                      )}
                      genre={movies.find(
                        (m) => m.Genre.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path='/directors/:name'
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col md={8}>
                    <DirectorView
                      directorMovies={movies.filter(
                        (movie) => movie.Director.Name === match.params.name
                      )}
                      director={movies.find(
                        (m) => m.Director.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
