import React from 'react';
import './App.css';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movie from './components/movie';
import NotFound from './components/common/notFound'
import Navbar from './components/navbar';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
