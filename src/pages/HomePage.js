import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as movieApi from '../services/movie-api';

export default class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = { trending: [] };

  componentDidMount() {
    movieApi.getTrending().then(movies => {
      this.setState({
        trending: movies,
      });
    });
  }

  render() {
    const { trending } = this.state;
    return (
      <div>
        <h1>Trending movies</h1>
        <ul>
          {trending.map(movie => (
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
