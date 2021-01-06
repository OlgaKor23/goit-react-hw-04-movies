import React, { Component } from 'react';
import * as movieApi from '../services/movie-api';
import { Route, Switch, Link } from 'react-router-dom';
import MoviesCredits from '../components/MovieCredits';
import MoviesReviews from '../components/MovieReviews';
import styles from './MoviesDetails.module.css';

export default class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = {
    movie: {
      genres: [],
    },
  };

  componentDidMount() {
    movieApi
      .getMovieDetales(this.props.match.params.movieId)
      .then(movie => {
        this.setState({
          movie: movie,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  //go back button

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {
      id,
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      genres,
    } = this.state.movie;
    let releaseYear = '';
    if (!!release_date) {
      releaseYear = release_date.substring(0, 4);
    }

    return (
      <div>
        <button className={styles.backBtn} type="button" onClick={this.goBack}>
          go back
        </button>
        <section className={styles.About}>
          {!!poster_path && (
            <img
              className={styles.Img}
              src={movieApi.posterimgpath + poster_path}
              alt={title}
            />
          )}
          <section>
            <h1>
              {title} ({releaseYear})
            </h1>
            <p>User score: {vote_average} </p>
            <p className={styles.bold}>Overwiew</p>
            <p>{overview}</p>
            <p className={styles.bold}>Genres</p>
            <ul>
              {genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </section>
        </section>
        <section className={styles.addInfoSection}>
          <p className={styles.bold}>Additional information</p>
          <Link
            className={styles.addInfo}
            to={{ pathname: `/movies/${id}/credits` }}
          >
            Credits
          </Link>
          <Link
            className={styles.addInfo}
            to={{ pathname: `/movies/${id}/reviews` }}
          >
            Reviews
          </Link>
        </section>
        <Switch>
          <Route path="/movies/:movieId/credits" component={MoviesCredits} />
          <Route path="/movies/:movieId/reviews" component={MoviesReviews} />
        </Switch>
      </div>
    );
  }
}
