import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./movie-view.scss";

export class MovieView extends React.Component {
  addMovieToFavorites(e) {
    const { movie } = this.props;
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    e.preventDefault();
    axios
      .post(
        `https://lamptissue-movie-flix.herokuapp.com/users/${username}/movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("movie added");
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row>
        <Col className='testCol' lg={6}>
          <img src={movie.ImagePath} />
        </Col>
        <Col className='testCol' lg={6}>
          <h2>{movie.Title}</h2>
          <h6>
            Director:
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant='link'>{movie.Director.Name}</Button>
            </Link>
          </h6>
          <h6>
            Genre:
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant='link'>{movie.Genre.Name}</Button>
            </Link>
          </h6>

          <p>{movie.Description}</p>
          <Button
            variant='success'
            onClick={(e) => this.addMovieToFavorites(e)}
          >
            Add to favorites
          </Button>
          <div className='buttonTest'>
            <Button
              className='mt-4'
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
