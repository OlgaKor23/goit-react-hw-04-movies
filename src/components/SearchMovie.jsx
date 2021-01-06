import React, { Component } from 'react';
import Searchbar from './Searchbar';
import * as movieApi from '../services/movie-api';
import { Link } from 'react-router-dom';

export default class SearchMovie extends Component {
  static propTypes = {};
  state = {
    movies: [],
    pageNumber: '',
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');
    if (!query) {
      return;
    }

    movieApi
      .searchMovies(query)
      .then(movies => {
        this.setState({
          movies: movies,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nextQuery = new URLSearchParams(this.props.location.search).get(
      'query',
    );

    if (prevQuery === nextQuery) {
      return;
    }

    movieApi
      .searchMovies(nextQuery)
      .then(movies => {
        this.setState({
          movies: movies,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  setSearchQuery = searchQuery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSearch={this.setSearchQuery} />

        <ul>
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <Link to={{ pathname: `/movies/${movie.id}` }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
