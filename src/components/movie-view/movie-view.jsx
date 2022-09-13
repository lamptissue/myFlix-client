import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster  d-flex justify-content-center mb-3'>
          <img src={movie.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>

        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant='link'>Genre</Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant='link'>Director</Button>
        </Link>

        <Button
          className='mt-4'
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
