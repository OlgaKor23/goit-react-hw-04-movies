import React, { Component } from 'react';
import * as movieApi from '../services/movie-api';
import styles from './MovieReviews.module.css';

export default class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = { reviews: [] };

  componentDidMount() {
    movieApi
      .getMovieReviews(this.props.match.params.movieId)
      .then(reviews => {
        this.setState({
          reviews: reviews,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.reviews.map(review => (
            <li className={styles.listItem} key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
