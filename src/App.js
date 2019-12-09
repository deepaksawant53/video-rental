import React from 'react';
import './App.css';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound'
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import MovieForm from './components/movieForm';
import { Route, Switch, Redirect } from 'react-router-dom';
import RegistrationForm from './components/registrationForm';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/movie/:id" component={MovieForm} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
