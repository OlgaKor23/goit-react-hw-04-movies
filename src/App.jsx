import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesDetails from './pages/MoviesDetails';
import styles from './App.module.css';
import SearchMovie from './components/SearchMovie';
import routes from './services/routes';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <ul className={styles.AppHeader}>
            <li>
              <Link className={styles.NavLink} to={routes.HOME}>
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.NavLink} to={routes.MOVIES}>
                Movie
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path={routes.HOME} component={HomePage} />
            <Route path={routes.MOVIESDETAILS} component={MoviesDetails} />
            <Route path={routes.MOVIES} component={SearchMovie} />

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
