import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "Silence of the Lambs",
          Description:
            "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
          Genre: {
            Name: "Thriller",
            Description:
              "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
          },
          Director: {
            Name: "Jonathan Demme",
            Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
            Born: "1944",
            Death: "2017",
          },
          ImagePath:
            "https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(film)#/media/File:The_Silence_of_the_Lambs_poster.jpg",
          Featured: "true",
        },
        {
          _id: 2,
          Title: "The Shawshank Redemption",
          Description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          Genre: {
            Name: "Drama",
            Description:
              "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters. Films that fall into drama sub-genres include historical drama, romantic drama, teen drama, medical drama, docudrama, and film noir.",
          },
          Director: {
            Name: "Frank Darabont",
            Bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School.",
            Birth: "1959",
          },
          ImagePath:
            "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=ext_shr_lnk",
          Featured: "true",
        },
        {
          _id: 3,
          Title: "The Godfather",
          Description:
            "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
          Genre: {
            Name: "Crime",
            Description:
              "Crime film is a genre that revolves around the action of a criminal mastermind. A Crime film will often revolve around the criminal himself, chronicling his rise and fall. Some Crime films will have a storyline that follows the criminal's victim, yet others follow the person in pursuit of the criminal.",
          },
          Director: {
            Name: "Francis Ford Coppola",
            Bio: "Francis Ford Coppola, American motion-picture director, writer, and producer whose films range from sweeping epics to small-scale character studies. As the director of films such as The Godfather (1972), The Conversation (1974), and Apocalypse Now (1979), he enjoyed his greatest success and influence in the 1970s, when he attempted to create an alternative to the Hollywood system of film production and distribution.",
            Birth: "1939",
          },
          ImagePath:
            "https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=ext_shr_lnk",
          Featured: "true",
        },
      ],
      selectedMovie: null,
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

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view' />;

    return (
      <div className='main-view'>
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
