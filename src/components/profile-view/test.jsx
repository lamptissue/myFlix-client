import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card, Modal }  from "react-bootstrap";

export class ProfileView extends React.Component {


// const [user, setUser] = useState({ MISSING CODE });

// const favouriteMovieList = movies.filter((movies) => {MISSING CODE});

const deleteAccount = () => {
  axios
    .delete("https://lamptissue-movie-flix.herokuapp.com/users/:username", {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      alert(`Your user account was deleted.`);
      localStorage.clear();
      window.open('/', '_self');
    })
    .catch((err) => console.log(err));
};



// const handleSubmit = (e) => { MISSING CODE};
// const removeFav = (id) => {MISSING CODE};
// const handleUpdate = (e) => {MISSING CODE};
// useEffect(() => {MISSING CODE}, []);

// return (
//   <div>
//     <UserInfo name={user.Username} email={user} />
//     <div>
//       <h2>Favourite Movies</h2>
//       {favouriteMovieList.map((movies) => {
//         return (
//           <div key={movies._id}>
//             <img src={movies.ImagePath} />
//             <Link to={`/movies/${movies._id}`}>
//               <h4>{movies.Title}</h4>
//             </Link>
//             <button variant='secondary' onClick={() => removeFav(movies._id)}>
//               Remove from list
//             </button>
//           </div>
//         );
//       })}
//     </div>
//     <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
//       <h2>Want to change some info?</h2>
//       <label>Username:</label>
//       <input
//         type='text'
//         name='Username'
//         defaultValue={user.Username}
//         onChange={(e) => handleUpdate(e)}
//       />
//       <label>Password</label>
//       <input
//         type='password'
//         name='password'
//         defaultValue={user.Password}
//         onChange={(e) => handleUpdate(e)}
//       />
//       <label>Email address</label>
//       <input
//         type='email'
//         name='email'
//         defaultValue={user.Email}
//         onChange={(e) => handleUpdate(e)}
//       />
//       <button variant='primary' type='submit'>
//         Update
//       </button>
//     </form>
//   </div>
// );

// const updateUser = () => {
//   axios
//     .put("https://lamptissue-movie-flix.herokuapp.com/users/:username", {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday,
//     })
//     .then((response) => {
//       const data = response.data;
//       console.log(data);
//       window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
//     })
//     .catch((e) => {
//       console.log("error updating username");
//     });
// };

// const deleteUser = () => {
//   axios
//     .delete("https://lamptissue-movie-flix.herokuapp.com/users/:username", {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday,
//     })
//     .then((response) => {
//       const data = response.data;
//       console.log(data);
//       window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
//     })
//     .catch((e) => {
//       console.log("error updating username");
//     });
// };

// // <Form></Form>;

// // Display user information
// // Username, dob, email

// // Put
// // Update username

// // Update Password
// // Update email
// // Update dob

// // Delete user
// // delete
// // https://lamptissue-movie-flix.herokuapp.com/users/{username}

// // get
// // Display users favourite movies
// // delete
// // allow user to remove favourite movie


<Form>
<Form.Group className="mb-3" controlId="formUsername">
  <Form.Label>Username:</Form.Label>
  <Form.Control type="text" placeholder="Enter email" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address:</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password: </Form.Label>
  <Form.Control type="password" placeholder="Password" />
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicDob">
  <Form.Label>Date of Birth: </Form.Label>
  <Form.Control type="date" placeholder="DD/MM/YYYY" />
</Form.Group>

<Button variant="primary" type="submit">
  Submit
</Button>
</Form>


<h2>Want to leave?</h2>

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete your profile? This action can't be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Delete Profile
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Button below 
function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="warning" onClick={() => setModalShow(true)}>
        Delete profile
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

render(<App />);

const addFavouriteMovie = (username) => {
    axois
    .post(("https://lamptissue-movie-flix.herokuapp.com/users/username/movies/movieId", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setFavoriteMovies(response.data.FavoriteMovies);
    })
    .catch((error) => console.error(error))
};

const removeFavouriteMovie = (username) => {
  axois
  .delete(("https://lamptissue-movie-flix.herokuapp.com/users/username/movies/movieId", {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    setFavoriteMovies(response.data.FavoriteMovies);
  })
  .catch((error) => console.error(error))
};


FavouriteMovies = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://mymovies-api-jbm.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was added");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  <Card>
  <Card.Img variant='top' src={movie.ImagePath} />
  <Card.Body>
    <Card.Title>
      <h2>{movie.Title}</h2>
    </Card.Title>
    <Card.Text>{movie.Genre.Name}</Card.Text>
    <Card.Text>{movie.Director.Name}</Card.Text>

    <Card.Text>{movie.Description}</Card.Text>
  </Card.Body>

  <div className='movie-view'>
    <div className='movie-poster d-flex justify-content-center mb-3'>
      <img src={movie.ImagePath} />
    </div>
    <div className='movie-title'>
      {/* <span className='label'>Title: </span> */}
      <span className='value'>
        <h2>{movie.Title}</h2>
      </span>
    </div>
    <div className='movie-description'>
      {/* <span className='label'>Description: </span> */}
      <span className='value'>
        <p>{movie.Description}</p>
      </span>
    </div>
    <Link to={`/genres/${movie.Genre.Name}`}>
      <Button variant='link'>Genre</Button>
    </Link>
    <Link to={`/directors/${movie.Director.Name}`}>
      <Button variant='link'>Director</Button>
    </Link>
    <Button
      variant='success'
      onClick={(e) => this.addMovieToFavorites(e)}
    >
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
</Card>

<h4>Favourite Movies</h4>

<Row>
  <Col className='favorite-movies'>
    {favoriteMovie.map((movie) => (
      <div>
        <Button
          variant='outline-danger'
          onClick={() => {
            this.removeFavoriteMovie(movie._id);
          }}
        >
          Remove
        </Button>
        <li key={movie._id}>{movie.Title}</li>
      </div>
    ))}
  </Col>
</Row>
</Row>

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

