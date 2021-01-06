import React, { Component } from 'react';
import * as movieApi from '../services/movie-api';
import styles from './MovieCredits.module.css';

export default class HomePage extends Component {
  static defaultProps = {};

  static propTypes = {};

  state = { credits: { crew: [], cast: [] } };

  componentDidMount() {
    movieApi
      .getMovieCredits(this.props.match.params.movieId)
      .then(credits => {
        this.setState({
          credits: credits,
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    const { credits } = this.state;

    return (
      <div>
        <h2 className={styles.Name}>Cast</h2>

        <ul>
          {credits &&
            credits.cast &&
            credits.cast.map(member => (
              <li className={styles.list} key={member.credit_id}>
                {member.profile_path && (
                  <img
                    src={movieApi.imgpath + member.profile_path}
                    alt={member.name}
                  />
                )}
                <p>{member.name}</p>
                <p>Character: {member.character}</p>
              </li>
            ))}
        </ul>
        <h2>Crew</h2>
        <ul>
          {credits &&
            credits.crew &&
            credits.crew.map(member => (
              <li key={member.credit_id}>
                {member.profile_path && (
                  <img
                    src={movieApi.imgpath + member.profile_path}
                    alt={member.name}
                  />
                )}
                <p>{member.name}</p>
                <p>Job: {member.job}</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
