import React from "react";
import { Button } from "react-bootstrap";
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
      <div className='movie-view'>
        <div className='movie-poster d-flex justify-content-center mb-3'>
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
        <Button variant='success' onClick={(e) => this.addMovieToFavorites(e)}>
          Add to favorites
        </Button>
        <Button
          className='mt-4'
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

// import React from "react";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

// import { Link } from "react-router-dom";

// import "./movie-view.scss";

// export class MovieView extends React.Component {
//   render() {
//     const { movie, onBackClick } = this.props;

//     return (
//       <Card className="movie-view">
//         <Card.Header>
//           <Card.Img variant="top" src={movie.ImagePath} />
//         </Card.Header>
//         <Card.Body className="movie-view-title">
//           <h1>{movie.Title}</h1>
//         </Card.Body>
//         <Card.Body>
//           <h4>Genre</h4>
//           <Link to={`/genres/${movie.Genre.Name}`}>
//             <h4 className="genre-link link">{movie.Genre.Name}</h4>
//           </Link>
//         </Card.Body>
//         <Card.Body>
//           <h4>Director</h4>
//           <Link to={`/directors/${movie.Director.Name}`}>
//             <h4 className="director-link link">{movie.Director.Name}</h4>
//           </Link>
//         </Card.Body>
//         <Card.Body>
//           <h4>Description:</h4>
//           {movie.Description}
//         </Card.Body>

//         <Card.Footer>
//           <Button
//             className="movie-view-button"
//             onClick={() => {
//               onBackClick();
//             }}
//           >
//             Back
//           </Button>
//         </Card.Footer>
//       </Card>
//     );
//   }
// }
