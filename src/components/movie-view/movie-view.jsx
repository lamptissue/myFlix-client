import React from "react";
import { Button } from "react-bootstrap";

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
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span className='value'>{movie.Director.Name}</span>
        </div>

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
